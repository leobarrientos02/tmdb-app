const VotePercentage = (num) => {
    return Math.round((num * 100) / 10);
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