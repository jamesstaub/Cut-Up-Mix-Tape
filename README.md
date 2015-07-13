# CutUp Mix Tape
write a message with song lyrics


**concept and goals
a user enters some words as seed ideas for a message they are crafting

the seed ideas are sent as a search request to GENIUS lyrics api

the Genius API returns segments of lyrics which match the seed ideas request.

those segments of lyrics are injected into a UI which allows the user to sort and edit the words.

the user crafts a message with the segments of lyrics

a spotify playlist is created with the songs from which lyrics were used


*project spec
** tiered development priorities for Cut Up

*** node/express server
1. construct a simple node/express server and implement local authentication strategy.
2. build basic api routes to make requests to
3. implement Genius API requests using the node-genius npm module


*** angular MVC frontend
1. build a simple template to consume the genius api results
2. add an input field to make search requests and render them in the page
3. implement a drag and drop directive to manipulate the search results and add them to the CutUp model.

***

** smarter querying/filtering of lyric segments
1. chunk up the user's input text into numerous requests, instead of a single one, thus allowing more relevant search results
2. implement a fuzzy search/filtering of the search results to find the best matching lyric segment for each search chunk.
3. include a reference to the chunked search query with the corresponding response, to associate them in the front end.


** dragable interface
when search results appear, the user must be able to select segments of search results, and drag them into their message composition

** song playlist
once song segments are added

** tools used
https://github.com/alexbooker/node-genius
https://github.com/marceljuenemann/angular-drag-and-drop-lists
