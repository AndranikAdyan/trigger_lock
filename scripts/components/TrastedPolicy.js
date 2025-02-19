export const TrastedPolicy = trustedTypes.createPolicy("AntiPhishing", {
    createHTML: (html) => html,
});