// kubernetes baglantısı için gerekli olan istemcileri yaratır ve export eder
// client.js server basladıgında bir kez calısır
// @kubernetes/client-node kutuphanesi import edilir ve kubeconfig dosyası okunur
// iki api istemcisi yaratılır: coreV1Api ve appsV1Api
// projenin diğer dosyaları bu istemcileri kullanarak kubernetes cluster'ına istek atabilir

// client-nodejs kütüphanesini import et
const k8s = require('@kubernetes/client-node');

// yeni ve boş bir KubeConfig objesi yaratılır ve kubeconfig dosyası okunur
// server adresi, kullanıcı adı, şifre, token gibi bilgiler bu dosyada bulunur
// loadFromDefault() fonksiyonu zekidir ve sistemdeki varsayılan kubeconfig dosyasını bulur ve okur
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

// coreV1Api ve appsV1Api istemcileri yaratılır
// coreV1Api: Pod, Service, ConfigMap gibi temel kaynakları yönetmek için kullanılır
// appsV1Api: Deployment, StatefulSet, DaemonSet gibi uygulama kaynaklarını yönetmek için kullanılır
const coreV1Api = kubeConfig.makeApiClient(k8s.CoreV1Api);
const appsV1Api = kubeConfig.makeApiClient(k8s.AppsV1Api);

// bu istemciler diğer dosyalarda kullanılmak üzere export edilir
module.exports = { coreV1Api, appsV1Api };
