# This Doc will outline how to set up this document for development purposes:

## Installing uv:

To install uv, reference [this site](https://docs.astral.sh/uv/getting-started/installation/#installation-methods).

The exact command that I, Steven Oh, used was this:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

> [!important]
> Note that you need to restart your terminal for changes to take effect. Then, try running `uv --version` to see if it is working properly.

### Other uv information:

uv should automatically sync your dependencies when you try to run a script. However, running `uv sync` is another way to do this and a good way to test that uv is properly working.

If you have a package you want to add that will go into production, use `uv add {package_name}`. To add a development package (aka one that will only be used by the developers -- example is for unit testing) use `uv add --dev {package_name}`.