const filters = {
    'reset': {
        'No Filter': 'none',
    },
    'blur': {
        'Light Blur': 'blur(1px)',
        'Meidum Blur': 'blur(2px)',
        'Heavy Blur': 'blur(3px)'
    },
    'contrast': {
        'Invert Colours': 'invert(100%)',
        'Low Contrast': 'contrast(15%)',
        'High Contrast': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgPGZpbHRlciBpZD0iSGlnaENvbnRyYXN0Ij4KICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIgcmVzdWx0PSJkZXNhdCIvPgogICAgICA8ZmVDb21wb25lbnRUcmFuc2Zlcj4KICAgICAgICA8ZmVGdW5jUiB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAuOCAuOSAxIiAvPgogICAgICAgIDxmZUZ1bmNHIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIC44IC45IDEiIC8+CiAgICAgICAgPGZlRnVuY0IgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgLjggLjkgMSIgLz4KICAgICAgPC9mZUNvbXBvbmVudFRyYW5zZmVyPgogICAgPC9maWx0ZXI+Cjwvc3ZnPgo=#HighContrast)'
    },
    'achromato': {
        'Achromatomaly': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iQWNocm9tYXRvbWFseSI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuNjE4IDAuMzIgMC4wNjIgMCAwIDAuMTYzIDAuNzc1IDAuMDYyIDAgMCAwLjE2MyAwLjMyIDAuNTE2IDAgMCAwIDAgMCAxIDAiLz4KICAgIDwvZmlsdGVyPgo8L3N2Zz4=#Achromatomaly)',
        'Achromatopsia': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iQWNocm9tYXRvcHNpYSI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuMjk5IDAuNTg3IDAuMTE0IDAgMCAwLjI5OSAwLjU4NyAwLjExNCAwIDAgMC4yOTkgMC41ODcgMC4xMTQgMCAwIDAgMCAwIDEgMCIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPg==#Achromatopsia)'
    },
    'prot': {
        'Protanomaly': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iUHJvdGFub21hbHkiPgogICAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwLjgxNyAwLjE4MyAwIDAgMCAwLjMzMyAwLjY2NyAwIDAgMCAwIDAuMTI1IDAuODc1IDAgMCAwIDAgMCAxIDAiLz4KICAgIDwvZmlsdGVyPgo8L3N2Zz4=#Protanomaly)',
        'Protanopia': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iUHJvdGFub3BpYSI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuNTY3IDAuNDMzIDAgMCAwIDAuNTU4IDAuNDQyIDAgMCAwIDAgMC4yNDIgMC43NTggMCAwIDAgMCAwIDEgMCIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPg==#Protanopia)'
    },
    'deuter': {
        'Deuteranomaly': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iRGV1dGVyYW5vbWFseSI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuOCAwLjIgMCAwIDAgMC4yNTggMC43NDIgMCAwIDAgMCAwLjE0MiAwLjg1OCAwIDAgMCAwIDAgMSAwIi8+CiAgICA8L2ZpbHRlcj4KICAgIDwvc3ZnPg==#Deuteranomaly)',
        'Deuteranopia': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iRGV1dGVyYW5vcGlhIj4KICAgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMC42MjUgMC4zNzUgMCAwIDAgMC43IDAuMyAwIDAgMCAwIDAuMyAwLjcgMCAwIDAgMCAwIDEgMCIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPg==#Deuteranopia)'
    },
    'tritan': {
        'Tritanomaly': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iVHJpdGFub21hbHkiPgogICAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwLjk2NyAwLjAzMyAwIDAgMCAwIDAuNzMzIDAuMjY3IDAgMCAwIDAuMTgzIDAuODE3IDAgMCAwIDAgMCAxIDAiLz4KICAgIDwvZmlsdGVyPgo8L3N2Zz4=#Tritanomaly)',
        'Tritanopia': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGZpbHRlciBpZD0iVHJpdGFub3BpYSI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuOTUgMC4wNSAwIDAgMCAwIDAuNDMzIDAuNTY3IDAgMCAwIDAuNDc1IDAuNTI1IDAgMCAwIDAgMCAxIDAiLz4KICAgIDwvZmlsdGVyPgo8L3N2Zz4=#Tritanopia)'
    }
};
