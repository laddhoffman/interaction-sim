_Can we represent the logic for each actor receiving messages (events)
in a functional style?_

    Perhaps, but we do 
    much as we wish it were otherwise
    have to consider state

each actor observes a series of events.
the mechanism for observation shall be a function call, supplying *event data*.
the actor can perform *actions*.

_what actions can an actor perform?_
this depends on the capabilities of each actor.
so that should be abstracted in this model.
then we can use this model to model different kinds of actors.

when modelling an actor you'll need to be able to define its *possible actions*.

you'll also need to define its *logic* for deciding when to act.

your options for initiating actions include any combination of:
  - time-based
  - random
  - observation-based

for modelling a particular domain, in addition to defining actors and actions
you will need to define *event data*.
this is the data actors will receive as "observations" when events occur.

_should sending messages to / receiving messages from other actors be modelled
specially, or left open to be implemented as generic actions / events?_

so you define actors with their logic for observations and actions
then you can inject events into the system.
you can inject events into the system simply by defining actors that perform
the desired actions.

now then, what of each actor? do they each get their own memory? do we impose
limitations on that memory?
perhaps memory can be implemented as action? that could enable us to do this
in a functional style.
you could achieve "memory" by taking actions that send events to other actors
who then take over the role of possibly carrying out your intentions.

what is the lifecycle of an actor?
can an actor create other actors?
can actors be spontaneously generated?
allowing actors to create actors seems like a simple enough mechanism.
do we impose constraints on generating actors or generated actors? and
in general, do we impose constraints on which actors can act on other actors?
if so, what kind of constraints? are they static or dynamic? mutable?
we can start simple by omitting constraints; then we can inspect behaviors
and possibly impose hard or soft constraints.

so let's say we agree that part of the lifecycle of an actor is their birth.
do they die? under what circumstances? can actors kill other actors?
a polite mechanism would be that they can ask other actors to die.
perhaps actors can grant privileges to other actors.
this also then introduces the possibility of for example having a mediator,
to whom some actors delegate permissions and of whom others make requests.
this can all be modelled using the generic mechanisms already specified.

---

we may want a data structure for representing the logic within actors?
the idea being that with a standardized representation of the logic, it can be
dynamically composed.
logic examples:
- if this event happens, do this
- if this event happens, and these events have already happened, do this
- if this event doesn't happen before this time, do this
- if this event doesn't happen before this other event, do this

as we were discussing earlier, aggregation can be implemented by storing state
information and updating it over time; this would lend a sort of indefinite
permanence to each actor;
let's consider an alternative:
create a new actor whose logic encodes your current data and intentions.
this has that sort of data-as-code/code-as-data, functional style.
what about late-binding? is that appropriate for our model? I'm not sure, but
let's see if we can get by without it.

but anyway, back to the question of representing our logic, and possibly being
able to update it dynamically. again this is a sort of code-as-data concept.

how would an actor decide how to treat the conditions it's supplied?
with meta-data, information about the context of the earlier decisions?
weight, probability? heuristics?
fitness functions? how do we measure outcomes?

an interesting possibility is to have different actors observe an event,
and each make an assessment based on their own context; then send their
results to each other; possibly iterate multiple times; and eventually each
make a decision based on the results of that sequence. i.e. consensus protocol.
Or, perhaps simpler but more brittle, each send their results to a common actor
who then synthesizes them into a conclusion.

these are the different kinds of algorithms we want to be able to test!

---

suppose one wanted to model the aggregation
do this if such and such happens and such and such has already happened
I can think of three ways.
1) Be able to spawn new actors -- in these you can encode your information
2) Read/write stack or heap space: keep data and reference it later.
  (manage detailed data structures)
3) Database!
And here therefore is where enter the considerations about what types of
guarantees databases can provide, and conversely what can go wrong with them.

What can actors know about each other?
On what can they agree?

---

also consider mechanisms for subscribing to data feeds from real systems!

---

decision-making
roles of actors
memory??
  -- by relying on memory constructs we make our modellable domain more specific
  we gain useful properties
  we also introduce new possible failure modes


