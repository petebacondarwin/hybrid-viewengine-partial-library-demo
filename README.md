# Hybrid ViewEngine/Partial Library Demo

This project demos that it is possible to hack together a hybrid library that publishes both ViewEngine code and Ivy code (partially compiled).
This library can then be consumed by both ViewEngine apps and Ivy apps (via the linker).

The requirement is that the application project is built by the CLI.


## Build the library

To build the hybrid distributable run:

```
yarn build-library
```

This scripts builds both ViewEngine and Ivy versions of the library, then merges the files together in a way that can be consumed by either ViewEngine or Ivy applications.

The script does the following steps:

- Build both partial and view-engine versions of the library.
- Move the partial FESM2015 format to the view-engine dist folder.
- Overwrite the view-engine typings files with the ones from the partial build.
- Update the package.json to point CLI to the partial build for FESM2015 and to tell ngcc not to touch these files.

## Serve the application (Ivy)

```
yarn serve
```

Note that ngcc runs to compile the standard Angular packages but not the `theLib` package.

## Serve the application (ViewEngine)

```
yarn serve -c view-engine
```

Note that despite the library containing partially compiled ivy code, it can still be consumed by a ViewEngine project.
