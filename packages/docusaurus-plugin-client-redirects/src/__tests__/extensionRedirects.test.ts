/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  createFromExtensionsRedirects,
  createToExtensionsRedirects,
} from '../extensionRedirects';

describe('createToExtensionsRedirects', () => {
  test('should reject empty extensions', () => {
    expect(() => {
      createToExtensionsRedirects(['/'], ['.html']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\".html\\" contains a \\".\\" (dot) which is not allowed.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should reject extensions with .', () => {
    expect(() => {
      createToExtensionsRedirects(['/'], ['.html']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\".html\\" contains a \\".\\" (dot) which is not allowed.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should reject extensions with /', () => {
    expect(() => {
      createToExtensionsRedirects(['/'], ['ht/ml']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\"ht/ml\\" contains a \\"/\\" (slash) which is not allowed.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should reject extensions with illegal url char', () => {
    expect(() => {
      createToExtensionsRedirects(['/'], [',']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\",\\" contains invalid URI characters.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should create redirects from html/htm extensions', () => {
    const ext = ['html', 'htm'];
    expect(createToExtensionsRedirects([''], ext)).toEqual([]);
    expect(createToExtensionsRedirects(['/'], ext)).toEqual([]);
    expect(createToExtensionsRedirects(['/abc.html'], ext)).toEqual([
      {from: '/abc', to: '/abc.html'},
    ]);
    expect(createToExtensionsRedirects(['/abc.htm'], ext)).toEqual([
      {from: '/abc', to: '/abc.htm'},
    ]);
    expect(createToExtensionsRedirects(['/abc.xyz'], ext)).toEqual([]);
  });

  test('should create "to" redirects when relativeRoutesPath contains a prefix', () => {
    expect(
      createToExtensionsRedirects(['/prefix/file.html'], ['html']),
    ).toEqual([{from: '/prefix/file', to: '/prefix/file.html'}]);
  });

  test('should not create redirection for an empty extension array', () => {
    const ext: string[] = [];
    expect(createToExtensionsRedirects([''], ext)).toEqual([]);
    expect(createToExtensionsRedirects(['/'], ext)).toEqual([]);
    expect(createToExtensionsRedirects(['/abc.html'], ext)).toEqual([]);
  });
});

describe('createFromExtensionsRedirects', () => {
  test('should reject empty extensions', () => {
    expect(() => {
      createFromExtensionsRedirects(['/'], ['.html']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\".html\\" contains a \\".\\" (dot) which is not allowed.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should reject extensions with .', () => {
    expect(() => {
      createFromExtensionsRedirects(['/'], ['.html']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\".html\\" contains a \\".\\" (dot) which is not allowed.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should reject extensions with /', () => {
    expect(() => {
      createFromExtensionsRedirects(['/'], ['ht/ml']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\"ht/ml\\" contains a \\"/\\" (slash) which is not allowed.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should reject extensions with illegal url char', () => {
    expect(() => {
      createFromExtensionsRedirects(['/'], [',']);
    }).toThrowErrorMatchingInlineSnapshot(`
      "Extension \\",\\" contains invalid URI characters.
      If the redirect extension system is not good enough for your usecase, you can create redirects yourself with the \\"createRedirects\\" plugin option."
    `);
  });

  test('should create redirects from html/htm extensions', () => {
    const ext = ['html', 'htm'];
    expect(createFromExtensionsRedirects([''], ext)).toEqual([]);
    expect(createFromExtensionsRedirects(['/'], ext)).toEqual([]);
    expect(createFromExtensionsRedirects(['/abc'], ext)).toEqual([
      {from: '/abc.html', to: '/abc'},
      {from: '/abc.htm', to: '/abc'},
    ]);
    expect(createFromExtensionsRedirects(['/def.html'], ext)).toEqual([]);
    expect(createFromExtensionsRedirects(['/def/'], ext)).toEqual([
      {from: '/def.html/', to: '/def/'},
      {from: '/def.htm/', to: '/def/'},
    ]);
  });

  test('should create "from" redirects when relativeRoutesPath contains a prefix', () => {
    expect(createFromExtensionsRedirects(['/prefix/file'], ['html'])).toEqual([
      {from: '/prefix/file.html', to: '/prefix/file'},
    ]);
  });

  test('should not create redirection for an empty extension array', () => {
    const ext: string[] = [];
    expect(createFromExtensionsRedirects([''], ext)).toEqual([]);
    expect(createFromExtensionsRedirects(['/'], ext)).toEqual([]);
    expect(createFromExtensionsRedirects(['/abc'], ext)).toEqual([]);
    expect(createFromExtensionsRedirects(['/def.html'], ext)).toEqual([]);
    expect(createFromExtensionsRedirects(['/def/'], ext)).toEqual([]);
  });
});
