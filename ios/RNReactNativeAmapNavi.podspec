package = JSON.parse(File.read(File.join(__dir__, '../package.json')))

Pod::Spec.new do |s|
  s.name         = "RNReactNativeAmapNavi"
  s.version      = "1.0.0"
  s.summary      = "RNReactNativeAmapNavi"
  s.description  = <<-DESC
                  RNReactNativeAmapNavi
                   DESC
  s.homepage     = package['repository']['url']
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNReactNativeAmapNavi.git", :tag => "master" }
  s.source_files  = "**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency 'AMapNavi', "~> 6.5.0"

end

