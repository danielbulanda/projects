# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :greenfitdiety,
  ecto_repos: [Greenfitdiety.Repo]

# Configures the endpoint
config :greenfitdiety, Greenfitdiety.Endpoint,
  # force_ssl: [rewrite_on: [:x_forwarded_proto]],
  url: [host: "localhost"],
  secret_key_base: "kZkxPazCzDaAieWbKsYjRwK7NQ1vszkJuxCMIAFDesbqnNkXOpLZ2aUaqL/n13Yp",
  render_errors: [view: Greenfitdiety.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Greenfitdiety.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, []},
    facebook: {Ueberauth.Strategy.Facebook, [default_scope: "email,public_profile",
                                             profile_fields: "email,first_name,last_name"]}
  ]

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: "966680561532-oplkhqosh4nhkgkevr12s43ihhglspcq.apps.googleusercontent.com",
  client_secret: "FVlkAmk0SXaRGkb9KapGPF3Z"

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: "873449029473110",
  client_secret: "0e61e681f6f7af8ad62c00b4e774a697"

config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "Greenfitdiety",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true, # optional
  secret_key: "GBiSGTGhbQONH7pCRdk5Cch40Hbl49KSSiZ8FLYxjDvQ9jSKzKD0GNqAefjMCcTE",
  serializer: Greenfitdiety.GuardianSerializer
