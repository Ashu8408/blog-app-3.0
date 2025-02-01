require 'rails_helper'
require 'csv'

RSpec.describe Post, type: :model do
  let(:post) do
    Post.new(
      title: Faker::Lorem.sentence,
      content: Faker::Lorem.paragraph
    )
  end

  before(:all) do
    @file_path = "#{Rails.root}/tmp/test_results_posts.csv"
    CSV.open(@file_path, 'w', headers: true) do |csv|
      csv << ['Scenario', 'Test Description', 'Result', 'Message']
    end
    @row_index = 0
    $scenario_number = 0
  end

  after(:all) do
    puts "Test results uploaded to #{@file_path}"
  end

  def log_result(description, result, message)
    puts "Logging to row number: #{@row_index}"

    CSV.open(@file_path, 'a', headers: true) do |csv|
      csv << [$scenario_number, description, result.inspect, message]
    end
  end

  describe 'Fields' do
    it { is_expected.to have_db_column(:title).of_type(:string) }
    it { is_expected.to have_db_column(:content).of_type(:text) }
  end

  describe 'Associations' do
    it 'has many comments' do
      $scenario_number += 1
      @row_index = $scenario_number
      association = Post.reflect_on_association(:comments)
      result = association.macro == :has_many
      message = result ? "Association exists" : "Association does not exist"
      expect(result).to be true

      log_result('Has many comments association', result, message)
    end
  end

  describe 'Validations' do
    it 'checks if title is present' do
      $scenario_number += 1
      @row_index = $scenario_number
      expect(post.title).to be_present

      result = true
      message = "Title '#{post.title}' is present"
      log_result('Presence of title', result, message)
    end

    it 'is invalid without a title' do
      $scenario_number += 1
      @row_index = $scenario_number
      post.title = nil
      expect(post).not_to be_valid
      expect(post.errors[:title]).to include("can't be blank")

      result = false
      message = "Post object without a title is invalid"
      log_result('Missing title validation', result, message)
    end

    it 'checks if content is present' do
      $scenario_number += 1
      @row_index = $scenario_number
      expect(post.content).to be_present

      result = true
      message = "Content is present"
      log_result('Presence of content', result, message)
    end

    it 'is invalid without content' do
      $scenario_number += 1
      @row_index = $scenario_number
      post.content = nil
      expect(post).not_to be_valid
      expect(post.errors[:content]).to include("can't be blank")

      result = false
      message = "Post without content input is invalid"
      log_result('Missing content validation', result, message)
    end

    it 'is valid with all fields present' do
      $scenario_number += 1
      @row_index = $scenario_number
      expect(post).to be_valid

      result = true
      message = "Post object with all fields is valid"
      log_result('All fields validation', result, message)
    end
  end
end
