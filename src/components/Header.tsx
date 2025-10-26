@@ .. @@
 import React from 'react';
-import { Link } from 'react-router-dom';
-import { Scale, User, LogOut } from 'lucide-react';
+import { Link, useNavigate } from 'react-router-dom';
+import { Scale, User, LogOut, Crown } from 'lucide-react';
 import { useAuthStore } from '../store/authStore';
+import { getProductByPriceId 
}} from '../stripe-config';
 
 export function Header() {
-  const { user, signOut } = useAuthStore();
+  const { user, subscription, signOut } = useAuthStore();
+  const navigate = useNavigate();
+
+  const handleSignOut = async () => {
+    await signOut();
+    navigate('/login');
+  };
+
+  const getSubscriptionDisplay = () => {
+    if (!subscription || subscription.subscription_status === 'not_started') {
+      return 'Gratuit';
+    }
+    
+    const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
+    return product?.name || 'Premium';
+  };
 
   return (
     <header className="bg-white shadow-sm border-b">
@@ .. @@
         </Link>
         
         <div className="flex items-center space-x-4">
+          {user && (
+            <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-50 rounded-full">
+              <Crown className="w-4 h-4 text-indigo-600" />
+              <span className="text-sm font-medium text-indigo-700">
+                {getSubscriptionDisplay()}
+              </span>
+            </div>
+          )}
+          
           {user ? (
             <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2">
@@ .. @@
               <button
-                onClick={signOut}
+                onClick={handleSignOut}
                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
               >
                 <LogOut className="w-4 h-4" />
@@ .. @@
             </div>
           ) : (
             <div className="flex items-center space-x-4">
+              <Link
+                to="/login"
+                className="text-gray-600 hover:text-gray-900 transition-colors"
+              >
+                Connexion
+              </Link>
+              <Link
+                to="/signup"
+                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
+              >
+                S'inscrire
+              </Link>
             </div>
           )}
         </div>