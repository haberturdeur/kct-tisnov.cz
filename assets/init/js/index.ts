import { default as params } from "@params";

// The club design has a fixed color scheme. Apply it before first paint,
// ignoring preferences saved by the old theme's mode and palette selectors.
document.documentElement.setAttribute("data-bs-theme", params.color);
document.documentElement.setAttribute("data-palette", params.palette);
