# Rails API

## Installation

### Dependencies:

1. Install Terminal Notifier (`brew install terminal-notifier`). If you have already installed Terminal Notifier, ensure it is upgraded to the latest version (`brew upgrade terminal-notifier`).
2. Install ImageMagick (`brew install imagemagick` or `sudo apt-get install imagemagick`)

### First-Time Setup:

1. Copy and modify the database.yml file: `cp config/database.yml.example config/database.yml`. If you are using PostgreSQL database then change the adapter to `postgresql` else if you are using MySQL / MariaDB change the adapter to `mysql2`.
2. Copy and modify the .env file: `cp .env.example .env`
3. Run `bundle install` to install all the gems
4. Run `rake db:setup` to create and seed the database
5. Run `rake db:test:load` to load the test database
6. Run `bundle exec guard` to run the server
7. Edit your hosts file (`subl /etc/hosts`) and add the following entry:

    ```
    127.0.0.1    api.claycms-dev.io
    ```

9. Now access the app at 'http://api.claycms-dev.io:8080'.

### Install RabbitMQ for Background Jobs:

Install RabbitMQ with Homebrew:

```bash
brew install rabbitmq
```

Then, run it (after ensuring that /usr/local/sbin is in your $PATH):

```bash
rabbitmq-server
```

### Handling updates:

1. Run `bundle install`
2. Run `rake db:migrate`

### Issues with Autoloading

If you create new directories under the `app` folder, you might need to run `bin/spring stop` for it to be recognized as all the autoload_paths are computed and cached during initialization.

### Watch for N+1 queries and unused eager loading

In development environment, any N+1 queries or unused eager loading would be reported in `log/bullet.log`.
