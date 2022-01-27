# [13.0.0](https://github.com/IndigoSoft/ngxd/compare/v12.0.1...v13.0.0) (2022-01-27)


### Features

* **core:** bump v13.0.0 and dropped @angular/core@12 and earlier ([b647da7](https://github.com/IndigoSoft/ngxd/commit/b647da762b30cd2c3bd001ef295ef43a6c401637))


### BREAKING CHANGES

* **core:** DROPPED ViewEngine

DROPPED @angular/core@12 AND EARLIER

    If you want to use @ngxd/core with a specific angular version, you have to install @ngxd/core which version you need:

      @angular/core@7  => npm install @ngxd/core@7
      @angular/core@8  => npm install @ngxd/core@8
      @angular/core@9  => npm install @ngxd/core@9
      @angular/core@10 => npm install @ngxd/core@10
      @angular/core@11 => npm install @ngxd/core@11
      @angular/core@12 => npm install @ngxd/core@12
      @angular/core@13 => npm install @ngxd/core@13



## [12.0.1](https://github.com/IndigoSoft/ngxd/compare/v11.0.1...v12.0.1) (2021-09-28)


### Bug Fixes

* adding null to possible types to support async pipe ([4a88e1c](https://github.com/IndigoSoft/ngxd/commit/4a88e1c4fd4eed1b80972730c3a9370d7f9051b4))


### Features

* **core:** bump v12.0.0 and dropped @angular/core@11 and earlier ([eccb2c2](https://github.com/IndigoSoft/ngxd/commit/eccb2c2447aea7aac6fe99137cf7e7fead4eb723))


### BREAKING CHANGES

* **core:** DROPPED ViewEngine

DROPPED @angular/core@11 AND EARLIER

    If you want to use @ngxd/core with a specific angular version, you have to install @ngxd/core which version you need:

      @angular/core@7  => npm install @ngxd/core@7
      @angular/core@8  => npm install @ngxd/core@8
      @angular/core@9  => npm install @ngxd/core@9
      @angular/core@10 => npm install @ngxd/core@10
      @angular/core@11 => npm install @ngxd/core@11
      @angular/core@12 => npm install @ngxd/core@12



## [11.0.1](https://github.com/IndigoSoft/ngxd/compare/v11.0.0...v11.0.1) (2021-04-26)



# [11.0.0](https://github.com/IndigoSoft/ngxd/compare/v10.0.0...v11.0.0) (2021-03-23)


### Features

* **core:** bump v11.0.0 and dropped @angular/core@10 and earlier ([f86056e](https://github.com/IndigoSoft/ngxd/commit/f86056efe76cb69361f3cbe90f79233df7d7ef2d))


### BREAKING CHANGES

* **core:**     DROPPED @angular/core@10 AND EARLIER
    If you want to use @ngxd/core with a specific angular version, you have to install @ngxd/core which version you need:
      @angular/core@7  => npm install @ngxd/core@7
      @angular/core@8  => npm install @ngxd/core@8
      @angular/core@9  => npm install @ngxd/core@9
      @angular/core@10 => npm install @ngxd/core@10
      @angular/core@11 => npm install @ngxd/core@11



# [10.0.0](https://github.com/IndigoSoft/ngxd/compare/v9.0.4...v10.0.0) (2020-07-17)


### Features

* **core:** bump v10.0.0 and dropped @angular/core@9 and earlier ([81147f4](https://github.com/IndigoSoft/ngxd/commit/81147f46cfab81be328893d24c161c8a6063669f))


### BREAKING CHANGES

* **core:** DROPPED @angular/core@9 AND EARLIER
If you whant to use @ngxd/core with specific angular version, please install @ngxd/core which version you need:
  @angular/core@7  => npm install @ngxd/core@7
  @angular/core@8  => npm install @ngxd/core@8
  @angular/core@9  => npm install @ngxd/core@9
  @angular/core@10 => npm install @ngxd/core@10



## [9.0.4](https://github.com/IndigoSoft/ngxd/compare/v9.0.3...v9.0.4) (2020-02-20)


### Bug Fixes

* **core:** call setter on host component with host context ([c8b5d1d](https://github.com/IndigoSoft/ngxd/commit/c8b5d1dc6b3cd0aebee556682a267de50bd8cbee)), closes [#21](https://github.com/IndigoSoft/ngxd/issues/21)



## [9.0.3](https://github.com/IndigoSoft/ngxd/compare/v9.0.2...v9.0.3) (2020-02-19)


### Bug Fixes

* **core:** made host input descriptor as configurable ([8dda070](https://github.com/IndigoSoft/ngxd/commit/8dda0708c5df9ead9bbb70017affea65b78d7f10)), closes [#26](https://github.com/IndigoSoft/ngxd/issues/26) [#29](https://github.com/IndigoSoft/ngxd/issues/29)



## [9.0.2](https://github.com/IndigoSoft/ngxd/compare/v9.0.1...v9.0.2) (2020-02-19)


### Bug Fixes

* disabled Ivy for library, libs should use ViewEngine compiler ([5ec5c79](https://github.com/IndigoSoft/ngxd/commit/5ec5c79f01d481c10e36147092303e39f7c602ca)), closes [#28](https://github.com/IndigoSoft/ngxd/issues/28)



## [9.0.1](https://github.com/IndigoSoft/ngxd/compare/v9.0.0...v9.0.1) (2020-02-18)


### Bug Fixes

* **core:** fixes Ivy ([7ef62c9](https://github.com/IndigoSoft/ngxd/commit/7ef62c96199c0e3d24a56c5767f6f89e8c53dd9e)), closes [#28](https://github.com/IndigoSoft/ngxd/issues/28) [#29](https://github.com/IndigoSoft/ngxd/issues/29)


### Features

* up angular version to 9 ([04b4789](https://github.com/IndigoSoft/ngxd/commit/04b478977091c695d6ca060c9fd5234c0fbfbda6))


### BREAKING CHANGES

* **core:** Components with getter and setter without both are not supported



# [9.0.0](https://github.com/IndigoSoft/ngxd/compare/v8.0.0...v9.0.0) (2020-02-07)


### Bug Fixes

* hide angular v9 warning ([77598e9](https://github.com/IndigoSoft/ngxd/commit/77598e9be385d3bcc0eb4644fde4ea22bcfa6d71))



# [8.0.0](https://github.com/IndigoSoft/ngxd/compare/v7.0.3...v8.0.0) (2019-05-29)



## [7.0.3](https://github.com/IndigoSoft/ngxd/compare/v7.0.2...v7.0.3) (2019-04-03)


### Bug Fixes

* **core:** fixes build ([b76dfdd](https://github.com/IndigoSoft/ngxd/commit/b76dfdd76ee504d20a639f544991c9e3ac68bfff))
* **core:** rebind inputs on change context ([#10](https://github.com/IndigoSoft/ngxd/issues/10)) ([f20ea91](https://github.com/IndigoSoft/ngxd/commit/f20ea911c68b2d4a12af28646fba7043b6cbbf97))



## [7.0.2](https://github.com/IndigoSoft/ngxd/compare/v7.0.1...v7.0.2) (2019-04-02)


### Bug Fixes

* **core:** broken tests ([#9](https://github.com/IndigoSoft/ngxd/issues/9)) ([0b223fe](https://github.com/IndigoSoft/ngxd/commit/0b223fef14ff656718106258c0b5303b45b7ae92))
* **core:** store output subscriptions and pass value to setter ([e4f2d7d](https://github.com/IndigoSoft/ngxd/commit/e4f2d7d992c30256645fc466b576016326b74f5d))



## [7.0.1](https://github.com/IndigoSoft/ngxd/compare/v7.0.0...v7.0.1) (2019-01-22)



# [7.0.0](https://github.com/IndigoSoft/ngxd/compare/fd32c40a32685ad362697537c5a33f24df9cc452...v7.0.0) (2018-11-08)


### Bug Fixes

* update to angular 7, silence warning ([278b6d2](https://github.com/IndigoSoft/ngxd/commit/278b6d2dd3e395d91c2c056cc3db4e1a872043aa)), closes [#6](https://github.com/IndigoSoft/ngxd/issues/6)
* update to angular 7, silence warning ([fd32c40](https://github.com/IndigoSoft/ngxd/commit/fd32c40a32685ad362697537c5a33f24df9cc452))



