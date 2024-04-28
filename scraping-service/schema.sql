Table user {
  id uuid [primary key]
  username varchar
  email varchar
  history History
}

Table user_history {
  id uuid [primary key]
  user_id uuid
  company varchar
  category varchar
  images string[]
}

Table image {
  id uuid [primary key]
  history_id uuid
  filepath varchar
}

ref: user.id < user_history.user_id
ref: user_history.id < image.history_id