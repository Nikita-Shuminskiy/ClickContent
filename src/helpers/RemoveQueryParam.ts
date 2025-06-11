export const removeQueryParam = (paramToRemove: string) => {
    const url = new URL(window.location.href);

    url.searchParams.delete(paramToRemove);

    window.history.replaceState(null, '', url.toString());
}
