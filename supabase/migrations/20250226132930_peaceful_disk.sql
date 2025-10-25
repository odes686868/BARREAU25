/*
  # Create unified questions table with array support

  1. Changes
    - Create questions table with all required fields
    - Use array type for incorrect_answers
    - Set up proper constraints and relationships
    - Add RLS policies

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create unified questions table with array type for incorrect_answers
CREATE TABLE IF NOT EXISTS questions (
  id text PRIMARY KEY,
  category_id integer NOT NULL CHECK (category_id BETWEEN 1 AND 7),
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on questions table
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read questions
CREATE POLICY "Allow authenticated users to read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to convert individual columns to array
CREATE OR REPLACE FUNCTION array_from_columns(a text, b text, c text)
RETURNS text[] AS $$
BEGIN
  RETURN ARRAY[a, b, c];
END;
$$ LANGUAGE plpgsql;

-- Insert existing questions from category tables
INSERT INTO questions (
  id,
  category_id,
  question_text,
  correct_answer,
  incorrect_answers,
  explanation,
  created_at
)
SELECT
  id,
  category_id,
  question_text,
  correct_answer,
  array_from_columns(
    "incorrect_answers/0",
    "incorrect_answers/1",
    "incorrect_answers/2"
  ),
  explanation,
  created_at
FROM category_1
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (
  id,
  category_id,
  question_text,
  correct_answer,
  incorrect_answers,
  explanation,
  created_at
)
SELECT
  id,
  category_id,
  question_text,
  correct_answer,
  array_from_columns(
    "incorrect_answers/0",
    "incorrect_answers/1",
    "incorrect_answers/2"
  ),
  explanation,
  created_at
FROM category_2
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (
  id,
  category_id,
  question_text,
  correct_answer,
  incorrect_answers,
  explanation,
  created_at
)
SELECT
  id,
  category_id,
  question_text,
  correct_answer,
  array_from_columns(
    "incorrect_answers/0",
    "incorrect_answers/1",
    "incorrect_answers/2"
  ),
  explanation,
  created_at
FROM category_3
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (
  id,
  category_id,
  question_text,
  correct_answer,
  incorrect_answers,
  explanation,
  created_at
)
SELECT
  id,
  category_id,
  question_text,
  correct_answer,
  array_from_columns(
    "incorrect_answers/0",
    "incorrect_answers/1",
    "incorrect_answers/2"
  ),
  explanation,
  created_at
FROM category_4
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (
  id,
  category_id,
  question_text,
  correct_answer,
  incorrect_answers,
  explanation,
  created_at
)
SELECT
  id,
  category_id,
  question_text,
  correct_answer,
  array_from_columns(
    "incorrect_answers/0",
    "incorrect_answers/1",
    "incorrect_answers/2"
  ),
  explanation,
  created_at
FROM category_5
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (
  id,
  category_id,
  question_text,
  correct_answer,
  incorrect_answers,
  explanation,
  created_at
)
SELECT
  id,
  category_id,
  question_text,
  correct_answer,
  array_from_columns(
    "incorrect_answers/0",
    "incorrect_answers/1",
    "incorrect_answers/2"
  ),
  explanation,
  created_at
FROM category_6
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (
  id,
  category_id,
  question_text,
  correct_answer,
  incorrect_answers,
  explanation,
  created_at
)
SELECT
  id,
  category_id,
  question_text,
  correct_answer,
  array_from_columns(
    "incorrect_answers/0",
    "incorrect_answers/1",
    "incorrect_answers/2"
  ),
  explanation,
  created_at
FROM category_7
ON CONFLICT (id) DO NOTHING;

-- Now add foreign key constraints
ALTER TABLE category_1 ADD CONSTRAINT category_1_id_fkey
  FOREIGN KEY (id) REFERENCES questions(id) ON DELETE CASCADE;

ALTER TABLE category_2 ADD CONSTRAINT category_2_id_fkey
  FOREIGN KEY (id) REFERENCES questions(id) ON DELETE CASCADE;

ALTER TABLE category_3 ADD CONSTRAINT category_3_id_fkey
  FOREIGN KEY (id) REFERENCES questions(id) ON DELETE CASCADE;

ALTER TABLE category_4 ADD CONSTRAINT category_4_id_fkey
  FOREIGN KEY (id) REFERENCES questions(id) ON DELETE CASCADE;

ALTER TABLE category_5 ADD CONSTRAINT category_5_id_fkey
  FOREIGN KEY (id) REFERENCES questions(id) ON DELETE CASCADE;

ALTER TABLE category_6 ADD CONSTRAINT category_6_id_fkey
  FOREIGN KEY (id) REFERENCES questions(id) ON DELETE CASCADE;

ALTER TABLE category_7 ADD CONSTRAINT category_7_id_fkey
  FOREIGN KEY (id) REFERENCES questions(id) ON DELETE CASCADE;

-- Update user_progress to reference questions table
ALTER TABLE user_progress DROP CONSTRAINT IF EXISTS user_progress_question_id_fkey;
ALTER TABLE user_progress ADD CONSTRAINT user_progress_question_id_fkey
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX questions_category_id_idx ON questions(category_id);

-- Function to automatically insert into questions table
CREATE OR REPLACE FUNCTION insert_question()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO questions (
    id,
    category_id,
    question_text,
    correct_answer,
    incorrect_answers,
    explanation,
    created_at
  )
  VALUES (
    NEW.id,
    NEW.category_id,
    NEW.question_text,
    NEW.correct_answer,
    array_from_columns(
      NEW."incorrect_answers/0",
      NEW."incorrect_answers/1",
      NEW."incorrect_answers/2"
    ),
    NEW.explanation,
    NEW.created_at
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each category table
CREATE TRIGGER category_1_insert_question
  BEFORE INSERT ON category_1
  FOR EACH ROW
  EXECUTE FUNCTION insert_question();

CREATE TRIGGER category_2_insert_question
  BEFORE INSERT ON category_2
  FOR EACH ROW
  EXECUTE FUNCTION insert_question();

CREATE TRIGGER category_3_insert_question
  BEFORE INSERT ON category_3
  FOR EACH ROW
  EXECUTE FUNCTION insert_question();

CREATE TRIGGER category_4_insert_question
  BEFORE INSERT ON category_4
  FOR EACH ROW
  EXECUTE FUNCTION insert_question();

CREATE TRIGGER category_5_insert_question
  BEFORE INSERT ON category_5
  FOR EACH ROW
  EXECUTE FUNCTION insert_question();

CREATE TRIGGER category_6_insert_question
  BEFORE INSERT ON category_6
  FOR EACH ROW
  EXECUTE FUNCTION insert_question();

CREATE TRIGGER category_7_insert_question
  BEFORE INSERT ON category_7
  FOR EACH ROW
  EXECUTE FUNCTION insert_question();