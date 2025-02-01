require 'rails_helper'
require 'csv'

RSpec.describe Comment, type: :model do
  let(:post) { Post.create!(title: "Sample Post", content: "This is a test post.") }
  let(:comment) do
    Comment.new(
      name: Faker::Name.name,
      comment: "This is a test comment.",
      post: post, # this links the comment to post
      is_deleted: false
    )
  end

  before(:all) do
    @file_path = "#{Rails.root}/tmp/test_results_comments.csv"
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
    it { is_expected.to have_db_column(:name).of_type(:string) }
    it { is_expected.to have_db_column(:comment).of_type(:text) }
    it { is_expected.to have_db_column(:post_id).of_type(:integer) }
    it { is_expected.to have_db_column(:is_deleted).of_type(:boolean) }
  end

  describe 'Associations' do
    it 'belongs to post' do
      $scenario_number += 1
      @row_index = $scenario_number
      association = Comment.reflect_on_association(:post)
      result = association.macro == :belongs_to
      message = result ? "Association exists" : "Association does not exist"
      expect(result).to be true

      log_result('Belongs to post association', result, message)
    end
  end

  describe 'Validations' do
    it 'checks if comment is present' do
      $scenario_number += 1
      @row_index = $scenario_number
      expect(comment.comment).to be_present

      result = true
      message = "Comment is present"
      log_result('Presence of comment', result, message)
    end

    it 'is invalid without a comment input' do
      $scenario_number += 1
      @row_index = $scenario_number
      comment.comment = nil
      expect(comment).not_to be_valid
      expect(comment.errors[:comment]).to include("can't be blank")

      result = false
      message = "comment cannot be empty, so invalid"
      log_result('Missing comment validation', result, message)
    end

    it 'is invalid without a post' do
      $scenario_number += 1
      @row_index = $scenario_number
      comment.post = nil
      expect(comment).not_to be_valid
      expect(comment.errors[:post]).to include("must exist")

      result = false
      message = "Comment without a post is invalid"
      log_result('Missing post association on comment validation', result, message)
    end

    it 'checks if is_deleted defaults to false' do
      $scenario_number += 1
      @row_index = $scenario_number
      expect(comment.is_deleted).to eq(false)

      result = true
      message = "is_deleted defaults to false"
      log_result('Validation of is_deleted', result, message)
    end

    it 'is valid with all fields present' do
      $scenario_number += 1
      @row_index = $scenario_number
      expect(comment).to be_valid

      result = true
      message = "Comment object with all fields is valid"
      log_result('All fields validation', result, message)
    end
  end
end
