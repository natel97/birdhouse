# Birdhouse

## About

Birdhouse is an API scaffolding tool for NestJS

## Usage

Usage: birdhouse `<command>`

where `<command>` is one of:
construct, init

## Example Syntax

```yaml
api:
  entities:
    - user:
      primary-key:
        id: string

      schema:
        - name: string
        - email: string
        - age: number

      has-many:
        - article
```
