@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { User, Mail, Calendar, BarChart3, Trophy, Target } from 'lucide-react';
+import { User, Mail, Calendar, BarChart3, Trophy, Target, Crown, CreditCard } from 'lucide-react';
+import { Link } from 'react-router-dom';
 import { useAuthStore } from '../store/authStore';
 import { supabase } from '../lib/supabase';
+import { SubscriptionStatus } from '../components/SubscriptionStatus';
 
 interface UserStats {
@@ .. @@
         <div className="bg-white rounded-lg shadow-md p-6">
           <div className="flex items-center space-x-4 mb-6">
             <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
               <User className="w-8 h-8 text-indigo-600" />
             </div>
             <div>
               <h1 className="text-2xl font-bold text-gray-900">{user.email}</h1>
               <p className="text-gray-600">Membre depuis {formatDate(user.created_at)}</p>
+              <div className="mt-2">
+                <SubscriptionStatus />
+              </div>
             </div>
           </div>
 
@@ .. @@
             </div>
           </div>
         </div>
+
+        {/* Subscription Management */}
+        <div className="bg-white rounded-lg shadow-md p-6">
+          <div className="flex items-center justify-between mb-4">
+            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
+              <Crown className="w-5 h-5 mr-2 text-yellow-500" />
+              Gestion de l'abonnement
+            </h2>
+          </div>
+          
+          <div className="space-y-4">
+            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
+              <div>
+                <h3 className="font-medium text-gray-900">Forfait actuel</h3>
+                <SubscriptionStatus />
+              </div>
+              <Link
+                to="/pricing"
+                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
+              >
+                <CreditCard className="w-4 h-4" />
+                <span>Voir les forfaits</span>
+              </Link>
+            </div>
+            
+            <div className="text-sm text-gray-600">
+              <p>
+                Avec le forfait Premium, profitez d'un accès illimité à tous nos examens de pratique 
+                et maximisez vos chances de réussite.
+              </p>
+            </div>
+          </div>
+        </div>
       </div>
     </div>
   );