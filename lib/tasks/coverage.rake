namespace :coverage do
  desc 'Merge and generate coverage reports from parallel tests'
  task :report do
    require 'simplecov'
    require "simplecov-console"
    require 'simplecov-cobertura'
    require 'fileutils'

    # Configure SimpleCov
    SimpleCov.configure do
      coverage_dir 'coverage/merged'
      formatter SimpleCov::Formatter::MultiFormatter.new([
        SimpleCov::Formatter::HTMLFormatter,
        SimpleCov::Formatter::Console,
        SimpleCov::Formatter::CoberturaFormatter
      ])
    end

    # Find and collate results
    resultset_files = Dir['coverage/parallel/*/.resultset.json']

    if resultset_files.empty?
      puts "No coverage results found!"
      exit(0)
    end

    puts "Collating #{resultset_files.length} result files..."
    SimpleCov.collate(resultset_files) do
      enable_coverage :branch
      add_filter '/spec/'
      add_filter '/config/'
      add_filter '/vendor/'
    end

    puts "\nReports generated in coverage/merged/"
  end

  desc 'Clean old coverage reports'
  task :clean do
    require 'fileutils'
    begin
      FileUtils.rm_rf('coverage')
      puts "Cleaned coverage directory"
    rescue StandardError => e
      puts "Failed to clean coverage directory: #{e.message}"
      exit(1)
    end
  end
end
