# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "canvas_text_helper"
  spec.version       = "0.0.1"
  spec.authors       = ["Kenneth Romney", "Nathan Mills"]
  spec.email         = ["kromney@instructure.com", "nathanm@instructure.com"]
  spec.summary       = "Canvas text helpers"

  spec.files         = Dir.glob("{lib,spec}/**/*") + %w[Rakefile test.sh]
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "i18n"
end
