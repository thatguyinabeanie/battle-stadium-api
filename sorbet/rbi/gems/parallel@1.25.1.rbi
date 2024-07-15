# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `parallel` gem.
# Please instead update this file by running `bin/tapioca gem parallel`.


# source://parallel//lib/parallel/version.rb#2
module Parallel
  class << self
    # @return [Boolean]
    #
    # source://parallel//lib/parallel.rb#243
    def all?(*args, &block); end

    # @return [Boolean]
    #
    # source://parallel//lib/parallel.rb#238
    def any?(*args, &block); end

    # source://parallel//lib/parallel.rb#234
    def each(array, options = T.unsafe(nil), &block); end

    # source://parallel//lib/parallel.rb#248
    def each_with_index(array, options = T.unsafe(nil), &block); end

    # source://parallel//lib/parallel.rb#307
    def filter_map(*_arg0, **_arg1, &_arg2); end

    # source://parallel//lib/parallel.rb#303
    def flat_map(*_arg0, **_arg1, &_arg2); end

    # source://parallel//lib/parallel.rb#228
    def in_processes(options = T.unsafe(nil), &block); end

    # source://parallel//lib/parallel.rb#212
    def in_threads(options = T.unsafe(nil)); end

    # source://parallel//lib/parallel.rb#252
    def map(source, options = T.unsafe(nil), &block); end

    # source://parallel//lib/parallel.rb#299
    def map_with_index(array, options = T.unsafe(nil), &block); end

    # Number of physical processor cores on the current system.
    #
    # source://parallel//lib/parallel.rb#312
    def physical_processor_count; end

    # Number of processors seen by the OS, used for process scheduling
    #
    # source://parallel//lib/parallel.rb#341
    def processor_count; end

    # source://parallel//lib/parallel.rb#346
    def worker_number; end

    # TODO: this does not work when doing threads in forks, so should remove and yield the number instead if needed
    #
    # source://parallel//lib/parallel.rb#351
    def worker_number=(worker_num); end

    private

    # source://parallel//lib/parallel.rb#384
    def add_progress_bar!(job_factory, options); end

    # source://parallel//lib/parallel.rb#647
    def call_with_index(item, index, options, &block); end

    # source://parallel//lib/parallel.rb#579
    def create_workers(job_factory, options, &block); end

    # options is either a Integer or a Hash with :count
    #
    # source://parallel//lib/parallel.rb#637
    def extract_count_from_options(options); end

    # source://parallel//lib/parallel.rb#665
    def instrument_finish(item, index, result, options); end

    # yield results in the order of the input items
    # needs to use `options` to store state between executions
    # needs to use `done` index since a nil result would also be valid
    #
    # source://parallel//lib/parallel.rb#674
    def instrument_finish_in_order(item, index, result, options); end

    # source://parallel//lib/parallel.rb#694
    def instrument_start(item, index, options); end

    # source://parallel//lib/parallel.rb#357
    def physical_processor_count_windows; end

    # source://parallel//lib/parallel.rb#613
    def process_incoming_jobs(read, write, job_factory, options, &block); end

    # source://parallel//lib/parallel.rb#567
    def replace_worker(job_factory, workers, index, options, blk); end

    # source://parallel//lib/parallel.rb#378
    def run(command); end

    # source://parallel//lib/parallel.rb#658
    def with_instrumentation(item, index, options); end

    # source://parallel//lib/parallel.rb#409
    def work_direct(job_factory, options, &block); end

    # source://parallel//lib/parallel.rb#519
    def work_in_processes(job_factory, options, &blk); end

    # source://parallel//lib/parallel.rb#453
    def work_in_ractors(job_factory, options); end

    # source://parallel//lib/parallel.rb#428
    def work_in_threads(job_factory, options, &block); end

    # source://parallel//lib/parallel.rb#587
    def worker(job_factory, options, &block); end
  end
end

# source://parallel//lib/parallel.rb#11
class Parallel::Break < ::StandardError
  # @return [Break] a new instance of Break
  #
  # source://parallel//lib/parallel.rb#14
  def initialize(value = T.unsafe(nil)); end

  # Returns the value of attribute value.
  #
  # source://parallel//lib/parallel.rb#12
  def value; end
end

# source://parallel//lib/parallel.rb#8
class Parallel::DeadWorker < ::StandardError; end

# source://parallel//lib/parallel.rb#32
class Parallel::ExceptionWrapper
  # @return [ExceptionWrapper] a new instance of ExceptionWrapper
  #
  # source://parallel//lib/parallel.rb#35
  def initialize(exception); end

  # Returns the value of attribute exception.
  #
  # source://parallel//lib/parallel.rb#33
  def exception; end
end

# source://parallel//lib/parallel.rb#98
class Parallel::JobFactory
  # @return [JobFactory] a new instance of JobFactory
  #
  # source://parallel//lib/parallel.rb#99
  def initialize(source, mutex); end

  # source://parallel//lib/parallel.rb#107
  def next; end

  # generate item that is sent to workers
  # just index is faster + less likely to blow up with unserializable errors
  #
  # source://parallel//lib/parallel.rb#136
  def pack(item, index); end

  # source://parallel//lib/parallel.rb#126
  def size; end

  # unpack item that is sent to workers
  #
  # source://parallel//lib/parallel.rb#141
  def unpack(data); end

  private

  # @return [Boolean]
  #
  # source://parallel//lib/parallel.rb#147
  def producer?; end

  # source://parallel//lib/parallel.rb#151
  def queue_wrapper(array); end
end

# source://parallel//lib/parallel.rb#20
class Parallel::Kill < ::Parallel::Break; end

# source://parallel//lib/parallel.rb#6
Parallel::Stop = T.let(T.unsafe(nil), Object)

# source://parallel//lib/parallel.rb#23
class Parallel::UndumpableException < ::StandardError
  # @return [UndumpableException] a new instance of UndumpableException
  #
  # source://parallel//lib/parallel.rb#26
  def initialize(original); end

  # Returns the value of attribute backtrace.
  #
  # source://parallel//lib/parallel.rb#24
  def backtrace; end
end

# source://parallel//lib/parallel.rb#156
class Parallel::UserInterruptHandler
  class << self
    # source://parallel//lib/parallel.rb#181
    def kill(thing); end

    # kill all these pids or threads if user presses Ctrl+c
    #
    # source://parallel//lib/parallel.rb#161
    def kill_on_ctrl_c(pids, options); end

    private

    # source://parallel//lib/parallel.rb#205
    def restore_interrupt(old, signal); end

    # source://parallel//lib/parallel.rb#190
    def trap_interrupt(signal); end
  end
end

# source://parallel//lib/parallel.rb#157
Parallel::UserInterruptHandler::INTERRUPT_SIGNAL = T.let(T.unsafe(nil), Symbol)

# source://parallel//lib/parallel/version.rb#3
Parallel::VERSION = T.let(T.unsafe(nil), String)

# source://parallel//lib/parallel/version.rb#3
Parallel::Version = T.let(T.unsafe(nil), String)

# source://parallel//lib/parallel.rb#51
class Parallel::Worker
  # @return [Worker] a new instance of Worker
  #
  # source://parallel//lib/parallel.rb#55
  def initialize(read, write, pid); end

  # might be passed to started_processes and simultaneously closed by another thread
  # when running in isolation mode, so we have to check if it is closed before closing
  #
  # source://parallel//lib/parallel.rb#68
  def close_pipes; end

  # Returns the value of attribute pid.
  #
  # source://parallel//lib/parallel.rb#52
  def pid; end

  # Returns the value of attribute read.
  #
  # source://parallel//lib/parallel.rb#52
  def read; end

  # source://parallel//lib/parallel.rb#61
  def stop; end

  # Returns the value of attribute thread.
  #
  # source://parallel//lib/parallel.rb#53
  def thread; end

  # Sets the attribute thread
  #
  # @param value the value to set the attribute thread to.
  #
  # source://parallel//lib/parallel.rb#53
  def thread=(_arg0); end

  # source://parallel//lib/parallel.rb#73
  def work(data); end

  # Returns the value of attribute write.
  #
  # source://parallel//lib/parallel.rb#52
  def write; end

  private

  # source://parallel//lib/parallel.rb#91
  def wait; end
end
