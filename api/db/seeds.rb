user = User.create!(
  email: 'test@keepworks.com',
  first_name: 'Test',
  last_name: 'User',
)

team = Team.create!(
  name: 'Clay'
)

team.team_memberships.create!(
  user: user,
  role: :owner
)

project = team.projects.create!(
  name: 'Test Project'
)

project.key_pairs.create!

project.assets.create!(
  name: 'Logo',
  file: File.open(Rails.root.join('fixtures', 'assets', 'logo.png'))
)

movie_entity = project.entities.create!(label: 'Movie', name: 'movie')
actor_entity = project.entities.create!(label: 'Actor', name: 'actor')

movie_name = movie_entity.fields.create!(label: 'Name', name: 'name', data_type: :single_line_text)
movie_genre = movie_entity.fields.create!(label: 'Genre', name: 'genre', data_type: :single_line_text)
movie_year = movie_entity.fields.create!(label: 'Year of Release', name: 'year', data_type: :number)

actor_first_name = actor_entity.fields.create!(label: 'First Name', name: 'first_name', data_type: :single_line_text)
actor_last_name = actor_entity.fields.create!(label: 'Last Name', name: 'last_name', data_type: :single_line_text)

movie_entity.records.create!(properties_attributes: [
  { field: movie_name, value: 'Back to the Future' },
  { field: movie_genre, value: 'Adventure' },
  { field: movie_year, value: 1985 }
])

movie_entity.records.create!(properties_attributes: [
  { field: movie_name, value: 'Back to the Future II' },
  { field: movie_genre, value: 'Adventure' },
  { field: movie_year, value: 1989 }
])

actor_entity.records.create!(properties_attributes: [
  { field: actor_first_name, value: 'Michael' },
  { field: actor_last_name, value: 'J. Fox' }
])
