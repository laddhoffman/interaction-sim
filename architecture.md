- controller
  - workers
    - worker1
    - worker2

- add worker
  either a method, or an interface/protocol?
  a way for a worker to add itself,
  but that only? or a way to add workers, self or others? that could be nice, as
  it leaves room for future expansion; then again, perhaps we should only build
  what we need now?

  fundamental choice to make: what assumptions to make or expectations to have
  about workers being online.
  is a worker defined as a process that's online and able to process requests,
  or can a worker do work offline?
  some workers can do work offline for sure. can all?
  depends what their work is, so it's a distinction to make. say a service is
  functional & has no side-effects; would that by definition mean it can only
  do work when online?
  no, because even then, once it receives your call, it can be offline while
  processing, and then online again when returning the result.
  
  we can know about message history
  so we can make our own definitions about what online means / how well a worker
  is doing 
  we can probably rely on workers to self-report to a large extent. if we
  haven't received a self-report in a while we can ask, and if we don't get
  an answer we can start to worry, but draw our own conclusions, i.e. retry later,
  alert an admin


