@@ .. @@
 import React from 'react'
-import { Link } from 'react-router-dom'
+import { Link, useNavigate } from 'react-router-dom'
 import { Scale, User, LogOut } from 'lucide-react'
+import { useAuth } from '../../hooks/useAuth'
+import { useSubscription } from '../../hooks/useSubscription'
+import { signOut } from '../../lib/auth'
+import { Button } from '../ui/Button'
 
 export const Header: React.FC = () => {
+  const { user } = useAuth()
+  const { plan } = useSubscription()
+  const navigate = useNavigate()
+
+  const handleSignOut = async () => {
+    try {
+      await signOut()
+      navigate('/login')
+    } catch (error) {
+      console.error('Error signing out:', error)
+    }
+  }
+
   return (
     <header className="bg-white shadow-sm border-b">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
@@ .. @@
           </Link>
           
           <nav className="hidden md:flex space-x-8">
-            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
-              Accueil
-            </Link>
-            <Link to="/exams" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
-              Examens
-            </Link>
-            <Link to="/progress" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
-              Progression
-            </Link>
+            {user && (
+              <>
+                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
+                  Accueil
+                </Link>
+                <Link to="/exams" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
+                  Examens
+                </Link>
+                <Link to="/progress" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
+                  Progression
+                </Link>
+              </>
+            )}
+            <Link to="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
+              Tarifs
+            </Link>
           </nav>
           
           <div className="flex items-center space-x-4">
-            <div className="flex items-center space-x-2 text-sm text-gray-600">
-              <User className="w-4 h-4" />
-              <span>Forfait Premium</span>
-            </div>
-            
-            <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
-              <LogOut className="w-4 h-4" />
-              <span className="text-sm">Déconnexion</span>
-            </button>
+            {user ? (
+              <>
+                {plan && (
+                  <div className="flex items-center space-x-2 text-sm text-gray-600">
+                    <User className="w-4 h-4" />
+                    <span>{plan.name}</span>
+                  </div>
+                )}
+                
+                <Button
+                  variant="ghost"
+                  size="sm"
+                  onClick={handleSignOut}
+                  className="flex items-center space-x-2"
+                >
+                  <LogOut className="w-4 h-4" />
+                  <span>Déconnexion</span>
+                </Button>
+              </>
+            ) : (
+              <div className="flex items-center space-x-2">
+                <Link
+                  to="/login"
+                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
+                >
+                  Connexion
+                </Link>
+                <Link
+                  to="/signup"
+                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
+                >
+                  S'inscrire
+                </Link>
+              </div>
+            )}
           </div>
         </div>
       </div>