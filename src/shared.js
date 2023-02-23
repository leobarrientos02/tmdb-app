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