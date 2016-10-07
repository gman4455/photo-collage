/*
    photo-collage v1.0.0, resizes photos and fits them into a collage
    Copyright (C) 2016 Garrett Oelze

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function ($) {
    
    var settings = {
        selector: ".photo-cell",
        horizontalMargin: 5,
        verticalMargin: 5,
        rowHeights: [240, 360, 480]
    };
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    
    function getImageProps(img) {
        return {
            width: img.naturalWidth,
            height: img.naturalHeight
        };
    };
    
    $.fn.photoLayout = function (options) {
        $.extend(settings, options);
        
        var grid = [[]],
            $container = this,
            $photos = $container.find("img"),
            tempIndex = 0,
            index = 0,
            xPos = 0,
            yPos = 0;
        
        // set up container
        $container.css("position", "relative");
        
        while (true) {
            // each iteration is one row.
            var tempWidth = 0,
                targetWidth = $container.width() + settings.horizontalMargin,
                row = [],
                rowHeight = settings.rowHeights[getRandomInt(0, settings.rowHeights.length - 1)];
            
            do {
                // each iteration is one column.
                if (tempIndex >= $photos.length)
                    break;
                
                var dimensions = getImageProps($photos[tempIndex]);
                
                var imageScaleRatio = rowHeight / dimensions.height;
                
                var imageProps = {
                    index: index,
                    width: Math.floor(dimensions.width * imageScaleRatio)
                };
                row.push(imageProps);
                tempWidth += imageProps.width;
                targetWidth -= settings.horizontalMargin;
                tempIndex++;
            } while (tempWidth < targetWidth);
            
            var scaleRatio = targetWidth / tempWidth;
            if (scaleRatio > 1)
                scaleRatio = 1;
            else
                rowHeight = Math.floor(rowHeight * scaleRatio);

            for (var i = 0, j = row.length; i < j; i++) {
                var imageProps = row[i],
                    imageWidth = Math.floor(imageProps.width * scaleRatio);

                var $img = $($container.find(settings.selector)[index]);
                
                $img.css({
                    position: "absolute",
                    left: xPos,
                    top: yPos,
                    width: imageWidth + "px",
                    height: rowHeight + "px"
                });
                
                $img.find("img").css({
                    width: "100%",
                    height: "100%"
                });
                
                xPos += imageWidth + settings.horizontalMargin;
                index++;
            }
            
            xPos = 0;
            
            if (row.length > 0)
                yPos += rowHeight + settings.verticalMargin;
            else
                break;
        }
        
        yPos -= settings.verticalMargin;
        $container.css("height", yPos);
    };
    
})(jQuery);