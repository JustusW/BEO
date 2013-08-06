BEO
===

BEO is an acronym standing for "Basis Entscheid Online", it is a software designed to allow safe and pseudonymous electronic voting.
This project is still in its starting phase.

Idea
====

This software is based on a pseudonmyous i-voting concept based on PGP.

Preliminary concept:
Members can vote with a pseudonymous PGP key generated on the client.
They get a validation key from the Membership Authority that is also being sent to the Clearing Authority without personal information.
The Clearing Authority receives this validation key signed by the pseudonym of the member and then creates a list of all allowed votees on request from the voting server for a specific moment in time.
The Voting Authority releases a vote with a list of petitions and accepts all votes signed with a key from the allowed votees list.
The Voting Authority returns a signed timestamp and number for every vote.
Upon termination of voting all votes are released including their signatures.
This method is not receipt free, but every voter can check against the clearing authority that only allowed votees have been counted.

Possible Adaptions
====
The proposed scheme allows for revoting, but since it isn't anonymous it is not proven against vote buying or distortion.
It is possible to include a mechanism for revoking a vote without making public which vote has been revoked.
If a method for changing a key pair is provided as well this would allow for anonymous revoting against an attacker not having access to the voteserver.

It should be noted that right now the Karlsruher Institute of Technology (KIT) is working on a method to allow anonymous revoting.
If this scheme is compatible with the basic idea of PGP based voting this would provide a good venue for improving the resilience against external and internal threats.

It has been proposed to allow for external signing using PGP Crypto Keys.
This allows for safe hardware without the risk of exposing ones private key to trojans or other local risks.

Processes
====

Voting
=====
AuthServer
======
  Provide Valid Public Keys
  Provide VoteServer Public Key
VoteServer
======
  Provide signed List of Petitions

Client
======
  Provide a signed vote - done
  Confirm the signature of petition list
  Confirm the signature of depersonalised vote receipt

Key Management
=====

