const VotePercentage = (num) => {
    let vote = Math.round((num * 100) / 10);
    let result = ''
    if (vote === 0) {
        result = 'NR'
    } else {
        result = vote
    }
    return result
}
export default VotePercentage;

export const FormatTitle = (string) => {
    let title = "";
    switch (string) {
        case "popular":
            title = "Popular";
            break;
        case "now_playing":
            title = "Now Playing";
            break;
        case "top_rated":
            title = "Top Rated";
            break;
        case "upcoming":
            title = "Upcoming";
            break;
        case 'airing_today':
            title = "Airing Today";
            break;
        case 'on_the_air':
            title = "On the Air";
            break;
        default:
            title = "All";
    }
    return title;
}

export const FormatDate = (releaseDate) => {
    if (releaseDate === "" || releaseDate === null) {
        return "To be released"
    }
    return new Date(releaseDate).toLocaleDateString();
}

export const FormatBirthDate = (date) => {
    if (date === "" || date === null) {
        return ""
    }
    return new Date(date).toLocaleDateString();
}


export const FormatLocaleDate = (creationDate) => {
    let formatDate = new Date(creationDate);
    return formatDate.toLocaleString();
}

export const CheckAvatar = (avatar) => {
    if (avatar == null) {
        return "https://www.gravatar.com/avatar/";
    } else if (avatar.includes("www.gravatar.com")) {
        return avatar.slice(1);
    }
    return "https://image.tmdb.org/t/p/original" + avatar;
}

export const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

export const handleMouseEnter = (id, arrow) => {
    let dropdown = document.getElementById(id);
    dropdown.style.display = "flex";

    let arrow_element = document.getElementById(arrow);
    arrow_element.style.transform = "rotate(180deg)"
};

export const handleMouseLeave = (id, arrow) => {
    let dropdown = document.getElementById(id);
    dropdown.style.display = "none";

    let arrow_element = document.getElementById(arrow);
    arrow_element.style.transform = "rotate(0deg)"
};

export const checkType = (type) => {
    if (type === "movie") {
        return "Movies";
    } else if (type === "tv") {
        return "Shows";
    } else if (type === "person") {
        return "Person";
    } else {
        return "Company";
    }
};

export const NullEmptyUndefinedChecker = (data) => {
    if (data === undefined) {
        return false;
    } else if (data === null) {
        return false;
    } else if (data === '') {
        return false;
    } else if (data.length === 0) {
        return false;
    } else {
        return true;
    }
}

export const languageObjects = [
    { name: "Arabic", iso: "ar" },
    { name: "Bulgarian", iso: "bg" },
    { name: "Chinese", iso: "zh" },
    { name: "Czech", iso: "cs" },
    { name: "Danish", iso: "da" },
    { name: "Dutch", iso: "nl" },
    { name: "English", iso: "en" },
    { name: "French", iso: "fr" },
    { name: "German", iso: "de" },
    { name: "Greek", iso: "el" },
    { name: "Hebrew", iso: "he" },
    { name: "Hungarian", iso: "hu" },
    { name: "Indonesian", iso: "id" },
    { name: "Italian", iso: "it" },
    { name: "Japanese", iso: "ja" },
    { name: "Korean", iso: "ko" },
    { name: "Polish", iso: "pl" },
    { name: "Portuguese", iso: "pt" },
    { name: "Romanian", iso: "ro" },
    { name: "Russian", iso: "ru" },
    { name: "Serbian", iso: "sr" },
    { name: "Spanish", iso: "es" },
    { name: "Swedish", iso: "sv" },
    { name: "Turkish", iso: "tr" },
    { name: "Ukranian", iso: "uk" },
    { name: "Vietnamese", iso: "vi" }
];

export const getBackgroundColor = (vote) => {
    let backgroundColor = "";
    if (vote >= 75) {
        backgroundColor = "#20cc78";
    }
    if (vote <= 74 && vote >= 25) {
        backgroundColor = "#d2d531";
    }
    if (vote < 24) {
        backgroundColor = "#571435";
    }
    return backgroundColor;
};

export const getBackgroundImage = (vote) => {
    let backgroundImage = "";
    if (vote >= 75) {
        backgroundImage = `linear-gradient(360deg, #20cc78 ${vote}%, #204529 30%)`;
    }
    if (vote <= 74 && vote >= 25) {
        backgroundImage = `linear-gradient(3600deg, #d2d531 ${vote}%, #3d3a0f 30%)`;
    }
    if (vote < 24) {
        backgroundImage = `linear-gradient(360deg, #db2360 ${vote}%, #204529 30%)`;
    }
    return backgroundImage;
}