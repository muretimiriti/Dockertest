FROM node:20 as nodejs_builder
# npmのバージョンを固定
RUN npm install -g npm
# Railsアプリ用ビルド箇所
FROM ruby:3.3.0
# Node.jsダウンロード用ビルド箇所の中からファイル群をコピーして利用可能にする
COPY --from=nodejs_builder /usr/local/bin /opt/node/bin
COPY --from=nodejs_builder /opt /opt
ENV PATH /opt/node/bin:/$PATH
WORKDIR /app
RUN bundle config set path vendor/bundle
# docker run実行時にコマンド指定が無い場合に実行されるコマンド
CMD ["bash"]