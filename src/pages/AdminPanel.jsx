import React from "react";
import { Button, Card, Grid } from "semantic-ui-react";

export default function AdminPanel() {
  return (
    
    <div className="admin-panel">
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column className="col-md-4 mb-4" width={5}>
            <div className="card-container">
              {/* User Kart */}
              <Card className="admin-card">
                <Card.Content>
                  <Card.Header>User</Card.Header>
                  <Card.Description>
                    <Button color="green" href="/admin/user">Listele</Button>
                    <Button color="blue">Ekle</Button>
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </Grid.Column>
          <Grid.Column className="col-md-4 mb-4" width={5}>
            <div className="card-container">
              {/* Category Kart */}
              <Card className="admin-card">
                <Card.Content>
                  <Card.Header>Category</Card.Header>
                  <Card.Description>
                    <Button color="green" href="/admin/category">Listele</Button>
                    <Button color="blue">Ekle</Button>
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </Grid.Column>
          <Grid.Column className="col-md-4 mb-4" width={5}>
            <div className="card-container">
              {/* Product Kart */}
              <Card className="admin-card">
                <Card.Content>
                  <Card.Header>Product</Card.Header>
                  <Card.Description>
                    <Button color="green" href="/admin/product">Listele</Button>
                    <Button color="blue">Ekle</Button>
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  </div>
  );
}
