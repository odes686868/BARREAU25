import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  email: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { email }: RequestBody = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: userId, error: userError } = await supabase
      .rpc('get_user_id_by_email', { user_email: email.toLowerCase() });

    if (userError) {
      console.error("Error getting user:", userError);
      throw userError;
    }
      
    if (!userId) {
      return new Response(
        JSON.stringify({ success: true, message: "If an account exists, a reset code has been sent" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const { error: insertError } = await supabase
      .from("password_reset_codes")
      .insert({
        user_id: userId,
        email: email.toLowerCase(),
        code: code,
        expires_at: expiresAt,
        used: false,
      });

    if (insertError) {
      console.error("Error inserting reset code:", insertError);
      throw insertError;
    }

    console.log(`Reset code generated for ${email}: ${code}`);
    console.log(`\n\n========================================`);
    console.log(`PASSWORD RESET CODE: ${code}`);
    console.log(`FOR EMAIL: ${email}`);
    console.log(`========================================\n\n`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Reset code generated successfully",
        code: code
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
