# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Workspace.destroy_all
# Membership.destroy_all
# Block.destroy_all

demo_user_1 = User.create!(
  first_name: 'Doug',
  last_name: 'Engelbart',
  email: 'doug@engelbart.com',
  password: 'password'
)

demo_user_2 = User.create!(
  first_name: 'Ted',
  last_name: 'Nelson',
  email: 'ted@nelson.com',
  password: 'password'
)

demo_user_3 = User.create!(
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@lovelace.com',
  password: 'password'
)

demo_user_4 = User.create!(
  first_name: 'Alan',
  last_name: 'Kay',
  email: 'alan@kay.com',
  password: 'password'
)

demo_user_5 = User.create!(
  first_name: 'Alan',
  last_name: 'Turing',
  email: 'alan@turing.com',
  password: 'password'
)

demo_user_6 = User.create!(
  first_name: 'Steve',
  last_name: 'Jobs',
  email: 'steve@jobs.com',
  password: 'password'
)

# Add demo workspaces

demo_workspace_1 = Workspace.create!(
  name: 'Acme Inc',
  domain: 'acmeinc',
  creator_id: demo_user_1.id
)

demo_workspace_2 = Workspace.create!(
  name: 'Project Xanadu',
  domain: 'projectxanadu',
  creator_id: demo_user_2.id
)

demo_workspace_3 = Workspace.create!(
  name: 'Pioneers',
  domain: 'pioneers',
  creator_id: demo_user_3.id
)

# Add demo memberships
# Add demo pages
# Add demo blocks



