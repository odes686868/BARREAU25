@@ .. @@
 import React from 'react';
-import { Link } from 'react-router-dom';
+import { Link, useNavigate } from 'react-router-dom';
 import { BookOpen, Target, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';
+import { Button } from '../components/ui/Button';
+import { getCurrentUser } from '../lib/auth';
 
 export function LandingPage() {
+  const navigate = useNavigate();
+
+  const handleGetStarted = async () => {
+    const user = await getCurrentUser();
+    if (user) {
+      navigate('/dashboard');
+    } else {
+      navigate('/signup');
+    }
+  };
+
   return (
     <div className="min-h-screen">
       {/* Hero Section */}
@@ .. @@
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
-              <Link
-                to="/exams"
-                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
-              >
+              <Button onClick={handleGetStarted} size="lg" className="px-8">
                 Commencer maintenant
                 <ArrowRight className="ml-2 h-5 w-5" />
-              </Link>
+              </Button>
               <Link
-                to="/about"
-                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
+                to="/pricing"
               >
-                En savoir plus
+                <Button variant="outline" size="lg" className="px-8">
+                  Voir les tarifs
+                </Button>
               </Link>
             </div>
           </div>
@@ .. @@
           <div className="text-center">
             <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à réussir votre examen ?</h2>
             <p className="text-xl text-gray-600 mb-8">Rejoignez des milliers d'étudiants qui ont réussi grâce à notre plateforme.</p>
-            <Link
-              to="/exams"
-              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
-            >
+            <Button onClick={handleGetStarted} size="lg" className="px-8">
               Commencer gratuitement
               <ArrowRight className="ml-2 h-5 w-5" />
-            </Link>
+            </Button>
           </div>
         </div>
       </section>