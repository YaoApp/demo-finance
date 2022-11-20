<p align="center">
    <h1 align="center">财务管理系统</h1>
</p>
<p align="center">
  <a aria-label="website" href="https://yaoapps.com" target="_blank">
    Website
  </a>
  ·
  <a aria-label="producthunt" href="https://www.producthunt.com/posts/yao-app-engine" target="_blank">
    Producthunt
  </a>
  ·
  <a aria-label="twitter" href="https://twitter.com/YaoApp" target="_blank">
    Twitter
  </a>
  ·
  <a aria-label="discord" href="https://discord.gg/nsKmCXwvxU" target="_blank">
    Discord
  </a>
</p>

财务管理系统后台 Demo。

![演示](https://release-bj-1252011659.cos.ap-beijing.myqcloud.com/docs/demo-finance/98007edd-3128-4dae-afa7-5d7dde2673ac.gif)

Yao deom-finance 采用 <a href="https://github.com/YaoApp/yao">Yao 应用引擎开发</a>，适用于快速搭建应用管理后台和 API 接口，快速制作应用 API 接口等场景。

[线上体验地址](https://demo-finance.iqka.com/admin/login/admin)
默认用户名: `xiang@iqka.com` , 默认密码: `A123456p+`

### 安装

#### 使用 Yao

[安装 YAO](https://yaoapps.com/doc/%E4%BB%8B%E7%BB%8D/%E5%AE%89%E8%A3%85%E8%B0%83%E8%AF%95)

```bash
mkdir -p /path/app/root
yao get yaoapp/demo-finance
yao start
```

登录管理后台

管理后台地址: `http://<IP>:<PORT>/admin/`

默认用户名: `xiang@iqka.com`

默认密码: `A123456p+`

#### 使用 Docker

[安装 Docker](https://docs.docker.com/get-docker/)

```
docker pull yaoapp/demo-finance:0.10.2-amd64
```

```bash
docker run -d --restart unless-stopped --name demo-finance -p 5099:5099  yaoapp/demo-finance:0.10.2-amd64
```

登录管理后台

管理后台地址: `http://<IP>:<PORT>/admin/`

默认用户名: `xiang@iqka.com`

默认密码: `A123456p+`
