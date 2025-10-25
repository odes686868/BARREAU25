/*
  # Ajouter des politiques pour la gestion des questions
  
  Permet aux utilisateurs authentifiés d'ajouter, modifier et supprimer des questions.
  
  Modifications :
  - Ajout de politiques INSERT, UPDATE, DELETE sur la table questions
  - Les utilisateurs authentifiés peuvent gérer les questions
  
  Sécurité :
  - Seuls les utilisateurs authentifiés peuvent gérer les questions
  - Les questions sont accessibles en lecture par tous les utilisateurs authentifiés
*/

-- Politique pour insérer des questions
CREATE POLICY "Utilisateurs authentifiés peuvent ajouter des questions"
  ON questions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politique pour modifier des questions
CREATE POLICY "Utilisateurs authentifiés peuvent modifier des questions"
  ON questions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politique pour supprimer des questions
CREATE POLICY "Utilisateurs authentifiés peuvent supprimer des questions"
  ON questions FOR DELETE
  TO authenticated
  USING (true);
