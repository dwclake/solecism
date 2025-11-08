declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

/* removed: project migrated away from CSS Modules to styled-components (styles are colocated in components) */