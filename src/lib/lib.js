class Lib {
    censoredTexts = [
        "sex",
        "porn",
        "xxx",
        "adult industry"
    ];

    censorFilter(textPiece)
    {
        let filtered = false;
        this.censoredTexts.forEach((item) => {
            if (textPiece.toLowerCase().search(item) >= 0) {
                filtered = true;
            }
        })
        return filtered;
    }

    cleanUpArray(arr)
    {
        const cleanedArr = [];
        arr.forEach(item => {
            let safe = true;
            // If we suspect any unwanted genre of titles dont add to list
            if (typeof item.name !== "undefined") {
                if (this.censorFilter(item.name)) {
                    safe = false;
                }
            }else if (typeof item.title !== "undefined") {
                if (this.censorFilter(item.title)) {
                    safe = false;
                }
            }else if (typeof item.original_title !== "undefined") {
                if (this.censorFilter(item.original_title)) {
                    safe = false;
                }
            }else if (typeof item.overview !== "undefined") {
                if (this.censorFilter(item.overview)) {
                    safe = false;
                }
            //    If the image doesnt exist also dont push item
            }else if (typeof item.poster_path !== "undefined") {
                if (item.poster_path === null) {
                    safe = false;
                }
            }else if (typeof item.poster_path === "undefined") {
                    safe = false;
            }
            if (safe) {
                cleanedArr.push(item);
            }
        });
        return cleanedArr;
    }
}

export default Lib;
