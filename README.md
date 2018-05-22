## Notes

Likely candidate for software platform is Erlang VM; interested in pursuing Elixir as the language of choice for the project.
Reasons to use erlang:
  - it has a nice actor + messaging model that would be suitable for this type of simulation
  - it should be able to scale to multiple processors and multiple machines if necessary
  - it provides APIs for components to be written in other languages and to interact with the platform

The system should be composed of modular, reusable components.

The simulation model should include the following:

- Each actor will have 
  - some properties whose values influence aspects of the actor's behavior
  - some attributes that may be affected by various activities but may not themselves have effects
- In interacting with each other, the actors will affect the values of each other's properties

Questions:
- Should the properties be hard-coded, or should the properties themselves be dynamic data elements?

Examples:

The system will be used for at least a couple of different purposes.

One purpose is to test certain models of interaction -- different algorithms that might be used to govern the behavior of interacting actors.

Another, related purpose is to then vary the parameters of some models and observe the effects.

If possible, it might be nice to design the simulation system and componentry such that individual parts could be re-used for other, practical purposes such as high availability services, batch task execution, and so on. This only as a side exercise to promote the use of robust designs in all software projects.
