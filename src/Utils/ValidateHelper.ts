export function highlightInputElement(input: HTMLElement) {
    if (input) {
        input.classList.remove("highligh-input");
        input.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        // input.offsetTop;
        input.classList.add("highligh-input");
    }
}
