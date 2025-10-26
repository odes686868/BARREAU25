@@ .. @@
 import React from 'react';
+import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';
 import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';
 
 export function Dashboard() {
@@ .. @@
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>
         
+        <div className="mb-8">
+          <SubscriptionStatus />
+        </div>
+        
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">