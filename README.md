BEO
===

BEO is an acronym standing for "Basis Entscheid Online", it is a software designed to allow safe and pseudonymous electronic voting.
This project is still in its starting phase.

Idea
===
This software is based on a pseudonmyous i-voting concept based on PGP.

Preliminary concept:
Members can vote with a pseudonymous PGP key generated on the client.
They get a validation key from the Membership Authority that is also being sent to the Clearing Authority without personal information.
The Clearing Authority receives this validation key signed by the pseudonym of the member and then creates a list of all allowed votees on

Voting Server

work in progress!

Processes
===

Voting

	AuthServer

		Provide Valid Public Keys
		Provide VoteServer Public Key

	VoteServer

		Provide signed List of Petitions

	Client

		Provide a signed vote - done
		Confirm the signature of petition list
		Confirm the signature of depersonalised vote receipt


Key Management
