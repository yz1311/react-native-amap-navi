require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.authors      = { package["author"] => 'yz1311@foxmail.com' }
  s.homepage     = package['repository']['url']
  s.license      = { :type => package['license']}
  s.platform     = :ios, "8.0"
  s.source       = { :git => package['repository']['url'] }
  s.source_files = '**/*.{h,m}'

  s.dependency 'React'
  s.dependency 'AMapNavi', "~> 6.9.1"
end
