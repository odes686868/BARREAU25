@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
-import { BookOpen, Clock, Trophy, TrendingUp, Play, BarChart3 } from 'lucide-react';
+import { BookOpen, Clock, Trophy, TrendingUp, Play, BarChart3, Crown, Lock } from 'lucide-react';
 import { useAuthStore } from '../store/authStore';
 import { supabase } from '../lib/supabase';
+import { SubscriptionStatus } from '../components/SubscriptionStatus';
 
 interface UserStats {
@@ .. @@
 interface QuizAttempt {
   id: number;
   exam_id: string;
   category_id: string | null;
   score: number | null;
   total_questions: number | null;
   completed: boolean;
   created_at: string;
 }
 
+interface UserTier {
+  tier: 'free' | 'premium';
+  free_tests_remaining: number;
+}
+
 export function DashboardPage() {
   const { user } = useAuthStore();
   const [stats, setStats] = useState<UserStats | null>(null);
   const [recentAttempts, setRecentAttempts] = useState<QuizAttempt[]>([]);
+  const [userTier, setUserTier] = useState<UserTier | null>(null);
   const [loading, setLoading] = useState(true);
 
@@ .. @@
   useEffect(() => {
     if (user) {
       fetchUserStats();
       fetchRecentAttempts();
+      fetchUserTier();
     }
   }, [user]);
 
@@ .. @@
     }
   };
 
+  const fetchUserTier = async () => {
+    try {
+      const { data, error } = await supabase
+        .from('user_tiers')
+        .select('tier, free_tests_remaining')
+        .eq('user_id', user!.id)
+        .single();
+
+      if (error) {
+        console.error('Error fetching user tier:', error);
+        return;
+      }
+
+      setUserTier(data);
+    } catch (error) {
+      console.error('Error fetching user tier:', error);
+    }
+  };
+
   const formatDate = (dateString: string) => {
@@ .. @@
     <div className="min-h-screen bg-gray-50 py-8">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-8">
           <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
           <p className="text-gray-600 mt-2">Bienvenue, {user?.email}</p>
+          <div className="mt-4">
+            <SubscriptionStatus />
+          </div>
         </div>
 
+        {/* Upgrade Banner for Free Users */}
+        {userTier?.tier === 'free' && (
+          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
+            <div className="flex items-center justify-between">
+              <div>
+                <h3 className="text-xl font-bold mb-2 flex items-center">
+                  <Crown className="w-6 h-6 mr-2 text-yellow-300" />
+                  Passez au Premium
+                </h3>
+                <p className="text-indigo-100 mb-4">
+                  Accès illimité à tous les examens • Tests sans limite • Support prioritaire
+                </p>
+                <p className="text-sm text-indigo-200">
+                  Tests gratuits restants: {userTier.free_tests_remaining}
+                </p>
+              </div>
+              <Link
+                to="/pricing"
+                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
+              >
+                Voir les forfaits
+              </Link>
+            </div>
+          </div>
+        )}
+
         {/* Stats Grid */}
@@ .. @@
             <div className="bg-white rounded-lg shadow-md p-6">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xl font-semibold text-gray-900">Examens disponibles</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Link
                   to="/exam/1"
-                  className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
+                  className={`block p-4 border border-gray-200 rounded-lg transition-all ${
+                    userTier?.tier === 'premium' || (userTier?.free_tests_remaining ?? 0) > 0
+                      ? 'hover:border-indigo-300 hover:shadow-md'
+                      : 'opacity-60 cursor-not-allowed'
+                  }`}
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="font-medium text-gray-900">Éthique et déontologie</h3>
                       <p className="text-sm text-gray-600">7 catégories • Questions variées</p>
                     </div>
-                    <Play className="w-5 h-5 text-indigo-600" />
+                    {userTier?.tier === 'premium' || (userTier?.free_tests_remaining ?? 0) > 0 ? (
+                      <Play className="w-5 h-5 text-indigo-600" />
+                    ) : (
+                      <Lock className="w-5 h-5 text-gray-400" />
+                    )}
                   </div>
+                  {userTier?.tier === 'free' && (userTier?.free_tests_remaining ?? 0) === 0 && (
+                    <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
+                      Premium requis
+                    </div>
+                  )}
                 </Link>
                 
                 <Link
                   to="/exam/2"
-                  className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
+                  className={`block p-4 border border-gray-200 rounded-lg transition-all ${
+                    userTier?.tier === 'premium'
+                      ? 'hover:border-indigo-300 hover:shadow-md'
+                      : 'opacity-60 cursor-not-allowed'
+                  }`}
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="font-medium text-gray-900">Droit appliqué</h3>
                       <p className="text-sm text-gray-600">12 catégories • Questions avancées</p>
                     </div>
-                    <Play className="w-5 h-5 text-indigo-600" />
+                    {userTier?.tier === 'premium' ? (
+                      <Play className="w-5 h-5 text-indigo-600" />
+                    ) : (
+                      <Lock className="w-5 h-5 text-gray-400" />
+                    )}
                   </div>
+                  {userTier?.tier === 'free' && (
+                    <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
+                      Premium requis
+                    </div>
+                  )}
                 </Link>
               </div>
             </div>