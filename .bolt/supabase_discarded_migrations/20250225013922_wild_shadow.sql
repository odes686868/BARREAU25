/*
  # Create category 1 table for Les règles déontologiques

  1. New Tables
    - `category_1`
      - `id` (text, primary key)
      - `question_text` (text, not null)
      - `correct_answer` (text, not null)
      - `incorrect_answers` (text array, not null)
      - `explanation` (text, not null)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `category_1` table
    - Add policy for authenticated users to read questions
*/

-- Create the category_1 table
CREATE TABLE IF NOT EXISTS category_1 (
  id TEXT PRIMARY KEY,
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  incorrect_answers TEXT[] NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE category_1 ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read questions
CREATE POLICY "Questions are viewable by authenticated users"
  ON category_1
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial questions
INSERT INTO category_1 (id, question_text, correct_answer, incorrect_answers, explanation)
VALUES 
  ('deon_001', 
   'Dans un système judiciaire contradictoire, Me Julie Tremblay représente un client accusé de fraude. Elle sait que son client prévoit de témoigner sous serment en niant des faits qu''il lui a précédemment avoués comme vrais lors d''une consultation privée. Selon la perspective ''réaliste'' de l''éthique professionnelle, telle que défendue par Monroe H. Freedman, pourquoi Me Tremblay pourrait-elle être justifiée de présenter ce témoignage au tribunal, même si elle sait qu''il s''agit d''un parjure, et quel principe sous-tend cette position ?',
   'Cela garantit les droits individuels du client en utilisant tous les moyens légaux disponibles, car l''avocat doit prioriser la défense de son client sur sa propre conscience morale.',
   ARRAY['Cela permet de révéler la vérité au tribunal, car le juge pourra déceler le mensonge et rendre une décision équitable.',
         'Cela respecte les normes morales ordinaires attendues par la société, qui exigent de l''avocat qu''il soit un modèle de vertu.',
         'Cela protège Me Tremblay contre une faute professionnelle, car elle suit les ordres explicites de son client.'],
   'La vision ''réaliste'' soutient que l''avocat doit utiliser tous les moyens légaux pour défendre son client, y compris un témoignage perjuré, pour protéger ses droits et sa dignité face au système judiciaire. Cette approche, défendue par Freedman, priorise le rôle partisan de l''avocat dans le système contradictoire sur les considérations de moralité ordinaire, laissant au juge ou au jury la responsabilité de trancher la vérité.'
  ),
  ('deon_002',
   'Me Pierre Dubois représente un client, M. Gagnon, qui a perdu une cause en dommages-intérêts et doit payer 50 000 $ à la partie adverse suite à un jugement exécutoire rendu le 10 janvier 2024. Le 15 janvier, M. Gagnon consulte Me Dubois et lui demande conseil pour éviter une saisie imminente de ses biens. Me Dubois lui suggère de transférer rapidement ses actifs liquides à un compte au nom de sa conjointe pour les ''mettre à l''abri''. Selon le Code de déontologie des avocats, pourquoi ce conseil pourrait-il entraîner une sanction disciplinaire pour Me Dubois, et quel article est en jeu ?',
   'Conseiller de cacher des actifs pour éviter une saisie est une aide à une conduite illégale, violant l''article 14, qui interdit de faciliter des actes frauduleux.',
   ARRAY['Informer un client des conséquences d''un jugement est une faute, car cela viole l''article 18 sur les communications publiques.',
         'Représenter un client dans une cause où l''avocat a un lien familial éloigné compromet l''indépendance, violant l''article 13.',
         'Refuser de témoigner contre son client lors d''une enquête est interdit par l''article 15 sur la divulgation obligatoire.'],
   'L''article 14 du Code de déontologie interdit à l''avocat d''aider une conduite illégale ou frauduleuse. Conseiller de cacher des actifs pour contourner une saisie légale est un manquement à l''intégrité, reconnu dans des décisions disciplinaires comme incompatible avec le rôle de l''avocat en tant qu''officier de justice collaborant à l''administration de la justice.'
  );