# Cut-Up-Tape
write a message with song lyrics


**concept and goals
a user enters some words as seed ideas for a message they are crafting

the seed ideas are sent as a search request to GENIUS lyrics api

the Genius API returns segments of lyrics which match the seed ideas request.

those segments of lyrics are injected into a UI which allows the user to sort and edit the words.

the user crafts a message with the segments of lyrics

a spotify playlist is created with the songs from which lyrics were used



** dragable interface
when search results appear, the user must be able to select segments of search results, and drag them into their message composition




** tools used

https://github.com/alexbooker/node-genius
