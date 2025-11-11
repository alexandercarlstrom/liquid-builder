import { LiquidFilter, LiquidTag } from '../types'

export const LIQUID_FILTERS: LiquidFilter[] = [
  // String filters
  {
    name: 'capitalize',
    description: 'Capitalizes the first word in a string',
    syntax: '{{ variable | capitalize }}',
  },
  {
    name: 'downcase',
    description: 'Converts a string to lowercase',
    syntax: '{{ variable | downcase }}',
  },
  {
    name: 'upcase',
    description: 'Converts a string to uppercase',
    syntax: '{{ variable | upcase }}',
  },
  {
    name: 'strip',
    description: 'Removes all whitespace from both ends of a string',
    syntax: '{{ variable | strip }}',
  },
  {
    name: 'lstrip',
    description: 'Removes all whitespace from the beginning of a string',
    syntax: '{{ variable | lstrip }}',
  },
  {
    name: 'rstrip',
    description: 'Removes all whitespace from the end of a string',
    syntax: '{{ variable | rstrip }}',
  },
  {
    name: 'append',
    description: 'Appends characters to a string',
    syntax: '{{ variable | append: "text" }}',
    parameters: ['text']
  },
  {
    name: 'prepend',
    description: 'Prepends characters to a string',
    syntax: '{{ variable | prepend: "text" }}',
    parameters: ['text']
  },
  {
    name: 'replace',
    description: 'Replaces all occurrences of a string with another',
    syntax: '{{ variable | replace: "search", "replacement" }}',
    parameters: ['search', 'replacement']
  },
  {
    name: 'replace_first',
    description: 'Replaces the first occurrence of a string',
    syntax: '{{ variable | replace_first: "search", "replacement" }}',
    parameters: ['search', 'replacement']
  },
  {
    name: 'remove',
    description: 'Removes all occurrences of a substring',
    syntax: '{{ variable | remove: "text" }}',
    parameters: ['text']
  },
  {
    name: 'remove_first',
    description: 'Removes the first occurrence of a substring',
    syntax: '{{ variable | remove_first: "text" }}',
    parameters: ['text']
  },
  {
    name: 'slice',
    description: 'Returns a substring, starting at the specified index',
    syntax: '{{ variable | slice: 0, 5 }}',
    parameters: ['start', 'length']
  },
  {
    name: 'split',
    description: 'Divides a string into an array using a separator',
    syntax: '{{ variable | split: "," }}',
    parameters: ['separator']
  },
  {
    name: 'truncate',
    description: 'Truncates a string down to the specified number of characters',
    syntax: '{{ variable | truncate: 20 }}',
    parameters: ['length']
  },
  {
    name: 'truncatewords',
    description: 'Truncates a string down to the specified number of words',
    syntax: '{{ variable | truncatewords: 10 }}',
    parameters: ['words']
  },

  // Number filters
  {
    name: 'abs',
    description: 'Returns the absolute value of a number',
    syntax: '{{ variable | abs }}',
  },
  {
    name: 'ceil',
    description: 'Rounds up a number to the nearest integer',
    syntax: '{{ variable | ceil }}',
  },
  {
    name: 'floor',
    description: 'Rounds down a number to the nearest integer',
    syntax: '{{ variable | floor }}',
  },
  {
    name: 'round',
    description: 'Rounds a number to the nearest integer',
    syntax: '{{ variable | round }}',
  },
  {
    name: 'plus',
    description: 'Adds a number to another number',
    syntax: '{{ variable | plus: 5 }}',
    parameters: ['number']
  },
  {
    name: 'minus',
    description: 'Subtracts a number from another number',
    syntax: '{{ variable | minus: 5 }}',
    parameters: ['number']
  },
  {
    name: 'times',
    description: 'Multiplies a number by another number',
    syntax: '{{ variable | times: 5 }}',
    parameters: ['number']
  },
  {
    name: 'divided_by',
    description: 'Divides a number by another number',
    syntax: '{{ variable | divided_by: 5 }}',
    parameters: ['number']
  },
  {
    name: 'modulo',
    description: 'Returns the remainder of a division operation',
    syntax: '{{ variable | modulo: 5 }}',
    parameters: ['number']
  },

  // Array filters
  {
    name: 'join',
    description: 'Combines the items in an array into a single string',
    syntax: '{{ array | join: ", " }}',
    parameters: ['separator']
  },
  {
    name: 'first',
    description: 'Returns the first item in an array',
    syntax: '{{ array | first }}',
  },
  {
    name: 'last',
    description: 'Returns the last item in an array',
    syntax: '{{ array | last }}',
  },
  {
    name: 'size',
    description: 'Returns the number of items in an array or string',
    syntax: '{{ variable | size }}',
  },
  {
    name: 'reverse',
    description: 'Reverses the order of items in an array',
    syntax: '{{ array | reverse }}',
  },
  {
    name: 'sort',
    description: 'Sorts items in an array',
    syntax: '{{ array | sort }}',
  },
  {
    name: 'sort_natural',
    description: 'Sorts items in an array using natural order',
    syntax: '{{ array | sort_natural }}',
  },
  {
    name: 'uniq',
    description: 'Removes duplicate items from an array',
    syntax: '{{ array | uniq }}',
  },
  {
    name: 'map',
    description: 'Extracts the values of a named property from an array of objects',
    syntax: '{{ array | map: "property" }}',
    parameters: ['property']
  },
  {
    name: 'where',
    description: 'Filters an array to only include objects with a specific property value',
    syntax: '{{ array | where: "property", "value" }}',
    parameters: ['property', 'value']
  },

  // Date filters
  {
    name: 'date',
    description: 'Formats a date',
    syntax: '{{ date | date: "%Y-%m-%d" }}',
    parameters: ['format']
  },

  // Misc filters
  {
    name: 'default',
    description: 'Sets a default value if the variable is nil, false, or empty',
    syntax: '{{ variable | default: "default value" }}',
    parameters: ['default']
  },
  {
    name: 'escape',
    description: 'Escapes HTML characters',
    syntax: '{{ variable | escape }}',
  },
  {
    name: 'escape_once',
    description: 'Escapes HTML characters without affecting already escaped entities',
    syntax: '{{ variable | escape_once }}',
  },
  {
    name: 'strip_html',
    description: 'Removes all HTML tags from a string',
    syntax: '{{ variable | strip_html }}',
  },
  {
    name: 'newline_to_br',
    description: 'Replaces newlines with HTML <br> tags',
    syntax: '{{ variable | newline_to_br }}',
  },
  {
    name: 'url_encode',
    description: 'Converts a string into a URL-safe format',
    syntax: '{{ variable | url_encode }}',
  },
  {
    name: 'url_decode',
    description: 'Decodes a URL-encoded string',
    syntax: '{{ variable | url_decode }}',
  },
]

export const LIQUID_TAGS: LiquidTag[] = [
  // Control flow tags
  {
    name: 'if',
    description: 'Executes a block of code only if a certain condition is true',
    syntax: '{% if condition %}\n  ...\n{% endif %}',
    type: 'control',
    hasEndTag: true
  },
  {
    name: 'elsif',
    description: 'Adds another condition to an if block',
    syntax: '{% elsif condition %}',
    type: 'control',
    hasEndTag: false
  },
  {
    name: 'else',
    description: 'Specifies a fallback case for an if block',
    syntax: '{% else %}',
    type: 'control',
    hasEndTag: false
  },
  {
    name: 'unless',
    description: 'Executes a block of code only if a certain condition is false',
    syntax: '{% unless condition %}\n  ...\n{% endunless %}',
    type: 'control',
    hasEndTag: true
  },
  {
    name: 'case',
    description: 'Creates a switch statement to compare a variable to different values',
    syntax: '{% case variable %}\n{% when value1 %}\n  ...\n{% when value2 %}\n  ...\n{% else %}\n  ...\n{% endcase %}',
    type: 'control',
    hasEndTag: true
  },
  {
    name: 'when',
    description: 'Defines conditions inside a case block',
    syntax: '{% when value %}',
    type: 'control',
    hasEndTag: false
  },

  // Iteration tags
  {
    name: 'for',
    description: 'Repeatedly executes a block of code',
    syntax: '{% for item in array %}\n  {{ item }}\n{% endfor %}',
    type: 'iteration',
    hasEndTag: true
  },
  {
    name: 'break',
    description: 'Causes the loop to stop iterating',
    syntax: '{% break %}',
    type: 'iteration',
    hasEndTag: false
  },
  {
    name: 'continue',
    description: 'Causes the loop to skip the current iteration',
    syntax: '{% continue %}',
    type: 'iteration',
    hasEndTag: false
  },
  {
    name: 'cycle',
    description: 'Loops through a group of strings and prints them in order',
    syntax: '{% cycle "one", "two", "three" %}',
    type: 'iteration',
    hasEndTag: false
  },
  {
    name: 'tablerow',
    description: 'Generates HTML table rows',
    syntax: '{% tablerow item in array %}\n  {{ item }}\n{% endtablerow %}',
    type: 'iteration',
    hasEndTag: true
  },

  // Variable tags
  {
    name: 'assign',
    description: 'Creates a new variable',
    syntax: '{% assign variable_name = value %}',
    type: 'variable',
    hasEndTag: false
  },
  {
    name: 'capture',
    description: 'Captures the string inside and assigns it to a variable',
    syntax: '{% capture variable_name %}\n  ...\n{% endcapture %}',
    type: 'variable',
    hasEndTag: true
  },
  {
    name: 'increment',
    description: 'Creates a new number variable and increases its value by 1',
    syntax: '{% increment variable_name %}',
    type: 'variable',
    hasEndTag: false
  },
  {
    name: 'decrement',
    description: 'Creates a new number variable and decreases its value by 1',
    syntax: '{% decrement variable_name %}',
    type: 'variable',
    hasEndTag: false
  },

  // Other tags
  {
    name: 'comment',
    description: 'Allows you to leave un-rendered code inside a Liquid template',
    syntax: '{% comment %}\n  This is a comment\n{% endcomment %}',
    type: 'raw',
    hasEndTag: true
  },
  {
    name: 'raw',
    description: 'Outputs Liquid code without parsing it',
    syntax: '{% raw %}\n  {{ this will not be parsed }}\n{% endraw %}',
    type: 'raw',
    hasEndTag: true
  },
  {
    name: 'liquid',
    description: 'Allows you to write Liquid logic without delimiters on each tag',
    syntax: '{% liquid\n  assign var = value\n  echo var\n%}',
    type: 'raw',
    hasEndTag: false
  },
  {
    name: 'echo',
    description: 'Outputs an expression',
    syntax: '{% echo variable %}',
    type: 'variable',
    hasEndTag: false
  },
]
