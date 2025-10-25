/*
  # Complete Database Setup with All Categories

  1. Tables
    - `questions`: Stores all questions with their answers and explanations
    - `user_progress`: Tracks user progress on questions

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users

  3. Data
    - Questions for all 7 categories:
      1. Les règles déontologiques
      2. La procédure disciplinaire
      3. La pratique professionnelle
      4. L'exercice illégal
      5. Le contexte social
      6. L'aide juridique
      7. L'assurance responsabilité
*/

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  category_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  incorrect_answers TEXT[] NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  question_id TEXT NOT NULL REFERENCES questions(id),
  status TEXT NOT NULL CHECK (status IN ('correct', 'incorrect', 'unanswered')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Questions are viewable by authenticated users" ON questions;
    DROP POLICY IF EXISTS "Users can only access their own progress" ON user_progress;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create RLS Policies
CREATE POLICY "Questions are viewable by authenticated users"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can only access their own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Clear existing data
TRUNCATE TABLE questions CASCADE;

-- Category 1: Les règles déontologiques
INSERT INTO questions (id, category_id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('deon_001', 1, 
   'Dans un système judiciaire contradictoire, Me Julie Tremblay représente un client accusé de fraude. Elle sait que son client prévoit de témoigner sous serment en niant des faits qu''il lui a précédemment avoués comme vrais lors d''une consultation privée. Selon la perspective ''réaliste'' de l''éthique professionnelle, telle que défendue par Monroe H. Freedman, pourquoi Me Tremblay pourrait-elle être justifiée de présenter ce témoignage au tribunal, même si elle sait qu''il s''agit d''un parjure, et quel principe sous-tend cette position ?',
   'Cela garantit les droits individuels du client en utilisant tous les moyens légaux disponibles, car l''avocat doit prioriser la défense de son client sur sa propre conscience morale.',
   ARRAY['Cela permet de révéler la vérité au tribunal, car le juge pourra déceler le mensonge et rendre une décision équitable.',
         'Cela respecte les normes morales ordinaires attendues par la société, qui exigent de l''avocat qu''il soit un modèle de vertu.',
         'Cela protège Me Tremblay contre une faute professionnelle, car elle suit les ordres explicites de son client.'],
   'La vision ''réaliste'' soutient que l''avocat doit utiliser tous les moyens légaux pour défendre son client, y compris un témoignage perjuré, pour protéger ses droits et sa dignité face au système judiciaire. Cette approche, défendue par Freedman, priorise le rôle partisan de l''avocat dans le système contradictoire sur les considérations de moralité ordinaire, laissant au juge ou au jury la responsabilité de trancher la vérité.'
  );

-- Category 2: La procédure disciplinaire
INSERT INTO questions (id, category_id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('proc_001', 2,
   'Le syndic du Barreau reçoit une plainte contre Me Sarah Lambert concernant des honoraires excessifs. Après enquête, il décide de ne pas porter plainte devant le Conseil de discipline. Le plaignant est insatisfait de cette décision. Quel recours s''offre à lui selon la loi, et dans quel délai doit-il l''exercer ?',
   'Il peut demander au Comité de révision un avis sur la décision du syndic dans les 30 jours suivant la réception de cette décision.',
   ARRAY['Il peut porter plainte directement au Conseil de discipline dans un délai de 15 jours.',
         'Il peut faire appel à la Cour supérieure dans les 45 jours de la décision.',
         'Il peut demander au Bâtonnier de réviser la décision dans un délai de 60 jours.'],
   'Le Code des professions prévoit que toute personne insatisfaite d''une décision du syndic de ne pas porter plainte peut demander l''avis du Comité de révision. Ce recours doit être exercé dans les 30 jours de la réception de la décision du syndic, offrant ainsi une garantie d''impartialité dans le processus disciplinaire.'
  );

-- Category 3: La pratique professionnelle
INSERT INTO questions (id, category_id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('prat_001', 3,
   'Me Alexandre Dubé souhaite utiliser l''intelligence artificielle pour l''aider dans la rédaction de documents juridiques. Quelles sont ses obligations professionnelles ?',
   'Il doit réviser et valider tout document généré par l''IA, et demeure entièrement responsable de son contenu juridique.',
   ARRAY['Il peut utiliser l''IA sans restriction car c''est un outil comme un autre.',
         'Il doit obtenir l''autorisation du Barreau avant d''utiliser l''IA.',
         'Il ne peut pas utiliser l''IA car elle n''est pas encore approuvée par le Barreau.'],
   'L''utilisation de l''IA ne dégage pas l''avocat de sa responsabilité professionnelle. Il doit exercer son jugement, valider l''exactitude du contenu et s''assurer que les documents respectent les normes professionnelles.'
  );

-- Category 4: L'exercice illégal
INSERT INTO questions (id, category_id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('illeg_001', 4,
   'Un consultant en immigration non-avocat prépare des demandes de résidence permanente et donne des conseils sur l''admissibilité. Cette pratique est-elle légale ?',
   'Non, car donner des conseils juridiques sur l''admissibilité à l''immigration est un acte réservé aux avocats et aux consultants réglementés.',
   ARRAY['Oui, car l''immigration n''est pas un domaine réservé aux avocats.',
         'Oui, s''il ne facture pas pour les conseils juridiques.',
         'Oui, s''il travaille sous la supervision d''un avocat.'],
   'Les conseils en matière d''immigration constituent des actes juridiques réservés aux avocats et aux consultants en immigration réglementés. Toute personne non autorisée qui donne de tels conseils commet un exercice illégal.'
  );

-- Category 5: Le contexte social
INSERT INTO questions (id, category_id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('soc_001', 5,
   'Un client malentendant demande les services d''un avocat. Quelles sont les obligations de l''avocat en matière d''accessibilité ?',
   'L''avocat doit prendre des mesures raisonnables pour assurer une communication efficace, comme faire appel à un interprète en langue des signes si nécessaire.',
   ARRAY['L''avocat peut refuser le mandat car l''adaptation serait trop coûteuse.',
         'Le client doit fournir son propre interprète.',
         'L''avocat peut communiquer uniquement par écrit.'],
   'Les avocats ont l''obligation d''assurer l''accès à la justice pour tous. Cela inclut l''adaptation raisonnable pour les clients ayant des besoins particuliers, conformément aux principes d''égalité et de non-discrimination.'
  );

-- Category 6: L'aide juridique
INSERT INTO questions (id, category_id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('aide_001', 6,
   'Un avocat accepte un mandat d''aide juridique dans un dossier complexe nécessitant plus d''heures que le tarif standard. Quelle est la procédure à suivre ?',
   'Il doit demander une autorisation préalable pour les heures supplémentaires et justifier leur nécessité.',
   ARRAY['Il peut facturer les heures supplémentaires directement au client.',
         'Il doit limiter ses services au nombre d''heures prévues au tarif.',
         'Il peut abandonner le dossier si les heures dépassent le tarif.'],
   'Le système d''aide juridique prévoit des mécanismes pour les cas complexes nécessitant plus de temps. L''avocat doit obtenir une autorisation préalable pour assurer une représentation adéquate tout en respectant les règles administratives.'
  );

-- Category 7: L'assurance responsabilité
INSERT INTO questions (id, category_id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('assur_001', 7,
   'Un avocat reçoit une mise en demeure pour une erreur présumée dans un dossier clos depuis 3 ans. Quels documents doit-il conserver pour sa défense ?',
   'Il doit conserver tous les documents pertinents du dossier même après l''expiration du délai minimal de conservation, car ils pourraient être nécessaires à sa défense.',
   ARRAY['Il peut détruire les documents car le délai minimal est expiré.',
         'Il doit seulement conserver la mise en demeure.',
         'Il peut numériser les documents et détruire les originaux.'],
   'La conservation des documents au-delà du délai minimal est cruciale pour la défense de l''avocat en cas de réclamation tardive. Cette pratique protège à la fois l''avocat et son assureur.'
  );