@@ .. @@
 import React from 'react';
 import { Link } from 'react-router-dom';
-import { Scale, BookOpen, Target, Users, ArrowRight, CheckCircle } from 'lucide-react';
+import { Scale, BookOpen, Target, Users, ArrowRight, CheckCircle, Crown } from 'lucide-react';
 
 export function Home() {
   return (
@@ .. @@
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link
                 to="/auth"
                 className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
               >
                 Commencer gratuitement
                 <ArrowRight className="w-5 h-5" />
               </Link>
+              <Link
+                to="/pricing"
+                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
+              >
+                <Crown className="w-5 h-5" />
+                Voir les forfaits
+              </Link>
             </div>
           </div>
         </div>