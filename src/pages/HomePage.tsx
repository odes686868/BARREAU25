@@ .. @@
 import React, { useEffect, useState } from 'react';
 import { Link } from 'react-router-dom';
-import { BookOpen, BarChart3, Trophy, Clock } from 'lucide-react';
+import { BookOpen, BarChart3, Trophy, Clock, Crown } from 'lucide-react';
 import { supabase } from '../lib/supabase';
 
 interface Exam {
 }
@@ .. @@
           </div>
         </div>
 
+        {/* Subscription CTA */}
+        <div className="mb-8">
+          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
+            <div className="flex items-center justify-between">
+              <div>
+                <div className="flex items-center space-x-2 mb-2">
+                  <Crown className="w-6 h-6" />
+                  <h2 className="text-2xl font-bold">Passez au Premium</h2>
+                </div>
+                <p className="text-indigo-100 mb-4">
+                  Accédez à toutes les fonctionnalités et maximisez vos chances de réussite
+                </p>
+                <ul className="text-sm text-indigo-100 space-y-1">
+                  <li>• Accès illimité à tous les examens</li>
+                  <li>• Questions pratiques illimitées</li>
+                  <li>• Suivi détaillé des progrès</li>
+                </ul>
+              </div>
+              <div className="text-right">
+                <Link
+                  to="/subscription"
+                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
+                >
+                  Découvrir Premium
+                </Link>
+              </div>
+            </div>
+          </div>
+        </div>
+
         {/* Examens disponibles */}
         <div className="grid gap-8">
           {exams.map((exam) => (
           )
           )
           }