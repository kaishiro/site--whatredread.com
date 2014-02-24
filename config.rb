require 'siteleaf'
require 'redcarpet'

# Load local ENV vars, for development
require './env' if File.exists?('env.rb')

Siteleaf.api_key = ENV['SITELEAF_KEY']
Siteleaf.api_secret = ENV['SITELEAF_SECRET']

set :client, Goodreads::Client.new(:api_key => ENV['GOODREADS_KEY'], :api_secret => ENV['GOODREADS_SECRET'])

set :markdown_engine, :redcarpet


# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

helpers do
  def markdown(source)
    Tilt::KramdownTemplate.new { source }.render
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  posts = Siteleaf::Page.find('52ad0a9c5dde22956400010c').posts.to_json
  File.open('./data/posts.json', 'w') do |file|  
    file.puts posts 
  end
  
  site = Siteleaf::Site.find('529f51115dde225c35000412').to_json
  File.open('./data/site.json', 'w') do |file|  
    file.puts site 
  end

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = ENV['S3_BUCKET']
  s3_sync.region                     = ENV['S3_REGION']
  s3_sync.aws_access_key_id          = ENV['S3_KEY']
  s3_sync.aws_secret_access_key      = ENV['S3_SECRET']
  s3_sync.delete                     = false # We delete stray files by default.
  s3_sync.after_build                = false # We do not chain after the build step by default. 
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false 
end
