# photo-collage
Takes a collection of photos and resizes them in order to fit them into a collage.

## Implementation
You need a collection of photos in the following format:

	<div id="container"> <!-- container can be anything, but must only contain photo cells. -->
	<div class="photo-cell">
		<img src="foo.jpg" />
	</div>
	<!-- repeat as necessary -->

All of the images **must** be loaded. I recommend using the imagesLoaded package.

	$("#container").imagesLoaded(function () {
		// all of these settings are defaults. You can change them as you wish.
		$("#container").photoLayout({
			selector: ".photo-cell",
			horizontalMargin: 5,
			verticalMargin: 5,
			rowHeights: [240, 360, 480] // randomly chooses between these heights for each row.
		});
	});

## Dependencies
- [jQuery](http://jquery.com/download)
- [imagesLoaded](https://github.com/desandro/imagesloaded) (not required, but highly recommended. Images must be pre-loaded one way or another)
